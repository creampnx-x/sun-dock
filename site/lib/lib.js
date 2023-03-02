const parse = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const types = require('@babel/types');
const { Map: map } = require('./config/index');

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
            styleProps.forEach((property) => {
                const { key, value } = property;

                if (key.type !== "Identifier" || value.type.search('Literal') === -1) return;

                const originKey = key.name;
                const resultKeyMap = map[originKey];
                if (!resultKeyMap) return;

                const originValue = value.value;
                const targetClass = resultKeyMap[originValue];
                if (!targetClass) return;

                targetClasses.push(targetClass);
            });
            if (!targetClasses.length) return;

            let originClasses = "";
            const classNamesAttr = attributes.find(attr => attr.name?.name === 'className');
            if (classNamesAttr) originClasses = classNamesAttr.value?.value ?? "";

            targetClasses.unshift(originClasses);
            const t = targetClasses.join(' ').trim();

            const newAttributes = [];
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
    // console.log(code);
    return code;
}