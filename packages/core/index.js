const parse = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const types = require('@babel/types');
const { map } = require('./config/index');

// todo: 抽离内部处理函数
exports.default = function (source) {
    const sourceAst = parse.parse(source, {
        sourceType: "unambiguous",
        plugins: ["jsx", "typescript"],
    });

    traverse(sourceAst, {
        JSXElement(path) {
            const attributes = path.node.openingElement.attributes;
            if (!attributes?.length) return;

            const styleAttribute = attributes.find(attr => attr.name?.name === 'style');
            if (!styleAttribute) return;

            const styleProps = styleAttribute.value.expression.properties;
            if (!styleProps?.length) return;

            const targetClasses = [];
            // todo: style props 分离可操作和不可操作的
            // 在每一个 return 的地方记录不可转换的 style prop
            const restProps = [];
            styleProps.forEach((property) => {
                const { key, value } = property;

                if (key.type !== "Identifier" || value.type.search('Literal') === -1) {
                    restProps.push(property);
                    return;
                }

                const originKey = key.name;
                const resultKeyMap = map[originKey];
                if (!resultKeyMap) {
                    // cant support props
                    // console.log(`the style '${originKey}' can not be transform. \n If you can, please give us feedback: https://github.com/creampnx-x/style2class/issues, \n thank you.`);
                    restProps.push(property);
                    return;
                }

                let targetClass = "";
                // todo: need optimize
                // Numberic: sufix `-px`
                if (value.type === 'NumericLiteral' && Number.parseInt(value.value) >= 0) {
                    if (resultKeyMap['#']) {
                        targetClass = `${resultKeyMap["#"]}-${value.value}`;
                    } else if (resultKeyMap['*']) {
                        targetClass = `${resultKeyMap["*"]}-${value.value}px`;
                    }
                    //targetClass.concat(`${resultKeyMap["*"]}-${value.value}px`);
                } else {
                    // String: if Map[*] exist: add sufix;
                    // else if Map[value] exist: using result;
                    // else finish;
                    const originValue = value.value;
                    const result = resultKeyMap[originValue];

                    if (result) { // fixed props: text-align: center => text-center
                        targetClass = result;
                    } else if (resultKeyMap['get']) { // for spacing like: padding: ''
                        const result = resultKeyMap['get'](originValue);
                        if (!result?.length) {
                            // maybe write wrong.
                            restProps.push(property);
                            return;
                        }
                        targetClass = result.join(' ');
                    }
                    else if (resultKeyMap['#']) { // one value like: padding-left: 1px => pl-1px
                        targetClass = `${resultKeyMap["#"]}-${originValue}`;
                    }
                    else if (resultKeyMap['*']) { // one value like: padding-left: 1px => pl-1px
                        targetClass = `${resultKeyMap["*"]}-${originValue}`;
                    }

                    if (!targetClass.length) {
                        restProps.push(property);
                        return;
                    }
                }
                targetClasses.push(targetClass);
            });

            // all of style props cant trans, so recover it.
            if (!targetClasses.length || targetClasses.length + restProps.length !== styleProps.length) return;
            styleAttribute.value.expression.properties = restProps;

            let originClasses = "";
            const classNamesAttr = attributes.find(attr => attr.name?.name === 'className');
            if (classNamesAttr) originClasses = classNamesAttr.value?.value ?? "";

            targetClasses.unshift(originClasses);
            const t = targetClasses.join(' ').trim();

            const newAttributes = restProps.length ? [styleAttribute] : [];
            attributes.forEach(item => {
                if (item.name?.name !== 'style' && item.name?.name !== 'className') {
                    newAttributes.push(item);
                }
            });

            const i = types.jsxIdentifier('className');
            const v = types.stringLiteral(t);
            const newClassAttr = types.jsxAttribute(i, v);
            newAttributes.push(newClassAttr);
            path.node.openingElement.attributes = newAttributes;
        },
    });

    const { code } = generator(sourceAst);
    return code;
}

exports.styleMap = map;