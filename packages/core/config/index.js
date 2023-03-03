exports.Map = {
    'textDecoration': {
        underline: 'underline',
        overline: 'overline',
        'line-through': 'line-through',
        none: 'no-underline'
    },
    'textAlign': {
        // todo: optimize: just for sufix. done
        '*': 'text'
    },
    'padingLeft': {
        '*': "pl"
    },
    'padding': {
        /** `get` has higher order than `*` for String.  */
        "*": 'p',
        /** @param {string} value */
        get(value) {
            // margin as same.
            // todo: regExp `done`
            const spacings = value.trim().split(/\s+/g);
            // this's not good function style;
            if (spacings.length === 1) return [
                `p-${spacings[0]}`
            ];
            else if (spacings.length === 2) return [
                `py-${spacings[0]}`,
                `px-${spacings[1]}`
            ];
            else if (spacings.length === 3) return [
                `pt-${spacings[0]}`,
                `py-${spacings[1]}`,
                `pb-${spacings[2]}`,
            ];
            else if (spacings.length === 4) return [
                `pt-${spacings[0]}`,
                `pr-${spacings[1]}`,
                `pb-${spacings[2]}`,
                `pl-${spacings[3]}`,
            ];
            else return []; // means cant trans.
            // 返回 class
        }
    }
}

/**
 * Map 分为三种形态：
 * 1. prop: { value: class } 固定值：text-align: center => text-center
 * 2. prop: { '*': class } 通配符类型: padding-left: 1px => pl-1px
 * 3. prop: { get(value): string } 函数类型，padding: '1px 1px 1px 1px' => [pt-1px pr-1px pb-1px pl-1px]
 */