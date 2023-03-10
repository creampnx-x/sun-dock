const { formatString } = require('../../util');

exports.default = {
    /** text */
    'fontSize': {
        '*': 'text'
    },
    'fontWeight': {
        '#': 'font'
    },
    'letterSpacing': {
        '*': 'tracking'
    },
    'lineHeight': {
        '*': 'leading'
    },
    'tabSize': {
        '*': 'tab'
    },
    'textDecorationThickness': {
        '*': 'decoration'
    },
    'textUnderlineOffset': {
        '*': 'underline-offset'
    },
    'textIndent': {
        '*': 'indent'
    },

    /** padding */
    'paddingLeft': {
        '*': "pl"
    },
    'paddingRight': {
        "*": 'pr'
    },
    'paddingBottom': {
        "*": 'pb'
    },
    'paddingTop': {
        "*": 'pt'
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
                `p-${formatString(spacings[0])}`
            ];
            else if (spacings.length === 2) return [
                `py-${formatString(spacings[0])}`,
                `px-${formatString(spacings[1])}`
            ];
            else if (spacings.length === 3) return [
                `pt-${formatString(spacings[0])}`,
                `py-${formatString(spacings[1])}`,
                `pb-${formatString(spacings[2])}`,
            ];
            else if (spacings.length === 4) return [
                `pt-${formatString(spacings[0])}`,
                `pr-${formatString(spacings[1])}`,
                `pb-${formatString(spacings[2])}`,
                `pl-${formatString(spacings[3])}`,
            ];
            else return []; // means cant trans.
            // 返回 class
        }
    },

    /** margin */
    'marginLeft': {
        '*': "ml"
    },
    'marginRight': {
        "*": 'mr'
    },
    'marginBottom': {
        "*": 'mb'
    },
    'marginTop': {
        "*": 'mt'
    },
    'margin': {
        /** `get` has higher order than `*` for String.  */
        "*": 'm',
        /** @param {string} value */
        get(value) {
            // margin as same.
            // todo: regExp `done`
            const spacings = value.trim().split(/\s+/g);
            // this's not good function style;
            if (spacings.length === 1) return [
                `m-${formatString(spacings[0])}`
            ];
            else if (spacings.length === 2) return [
                `my-${formatString(spacings[0])}`,
                `mx-${formatString(spacings[1])}`
            ];
            else if (spacings.length === 3) return [
                `mt-${formatString(spacings[0])}`,
                `my-${formatString(spacings[1])}`,
                `mb-${formatString(spacings[2])}`,
            ];
            else if (spacings.length === 4) return [
                `mt-${formatString(spacings[0])}`,
                `mr-${formatString(spacings[1])}`,
                `mb-${formatString(spacings[2])}`,
                `ml-${formatString(spacings[3])}`,
            ];
            else return []; // means cant trans.
            // 返回 class
        }
    },

    /** width */
    'width': {
        '*': 'w',
        '100%': 'w-full',
        'min-content': 'w-min',
        'max-content': 'w-max'
    },
    'minWidth': {
        '*': 'min-w',
        '100%': 'min-w-full',
        'min-content': 'min-w-min',
        'max-content': 'min-w-max'
    },
    'maxWidth': {
        '*': 'max-w',
        '100%': 'max-w-full',
        'min-content': 'max-w-min',
        'max-content': 'max-w-max'
    },

    /** height */
    'height': {
        '*': 'h',
        '100%': 'h-full',
        'min-content': 'h-min',
        'max-content': 'h-max'
    },
    'minHeight': {
        '*': 'min-h',
        '100%': 'min-h-full',
        'min-content': 'min-h-min',
        'max-content': 'min-h-max'
    },
    'maxHeight': {
        '*': 'max-h',
        '100%': 'max-h-full',
        'min-content': 'max-h-min',
        'max-content': 'max-h-max'
    },

    /** order */
    'order': {
        '#': 'order'
    },

    /** position */
    'top': {
        '*': 'top',
        get(value) {
            // value: -2 / -2px / 2px
            const type = typeof value;
            const spacing = Number.parseFloat(value);
            if (type === 'number') { // -2
                return [`-top-${value}px`]
            } else if (spacing < 0) {
                return [`-top-${formatString(value)}`]
            } else {
                return [`top-${formatString(value)}`]
            }
        }
    },
    'right': {
        '*': 'right',
        get(value) {
            // value: -2 / -2px / 2px
            const type = typeof value;
            const spacing = Number.parseFloat(value);
            if (type === 'number') { // -2
                return [`-right-${value}px`]
            } else if (spacing < 0) {
                return [`-right-${formatString(value)}`]
            } else {
                return [`right-${formatString(value)}`]
            }
        }
    },
    'bottom': {
        '*': 'bottom',
        get(value) {
            // value: -2 / -2px / 2px
            const type = typeof value;
            const spacing = Number.parseFloat(value);
            if (type === 'number') { // -2
                return [`-bottom-${value}px`]
            } else if (spacing < 0) {
                return [`-bottom-${formatString(value)}`]
            } else {
                return [`bottom-${formatString(value)}`]
            }
        }
    },
    'left': {
        '*': 'left',
        get(value) {
            // value: -2 / -2px / 2px
            const type = typeof value;
            const spacing = Number.parseFloat(value);
            if (type === 'number') { // -2
                return [`-left-${value}px`]
            } else if (spacing < 0) {
                return [`-left-${formatString(value)}`]
            } else {
                return [`left-${formatString(value)}`]
            }
        }
    },
    'zIndex': {
        '*': 'z'
    },

    /** grid */
    'columnGap': {
        '*': 'gap-x'
    },
    'rowGap': {
        '*': 'gap-y'
    },
    'gap': {
        '*': 'gap'
    },
    'gridGap': {
        '*': 'gap'
    },
    /** disabled: grid-column, grid-row */
    'gridColumnStart': {
        '*': 'col-start'
    },
    'gridColumnEnd': {
        '*': 'col-end'
    },
    'gridRowStart': {
        '*': 'row-start'
    },
    'gridRowEnd': {
        '*': 'row-end'
    },
    'gridAutoRows': {
        'auto': 'auto-rows-auto',
        'min': 'auto-rows-min',
        'max': 'auto-rows-max',
        'minmax(0, 1fr)': 'auto-rows-fr'
    },
    'gridAutoColumns': {
        'auto': 'auto-columns-auto',
        'min': 'auto-columns-min',
        'max': 'auto-columns-max',
        'minmax(0, 1fr)': 'auto-columns-fr'
    },

    /** flex */
    'flexBasis': {
        '#': 'basis'
    },
    /**  only two impl in windi. */
    'flexGrow': {
        // '*': 'flex-grow'
    },
    'flexShrink': {
        // '*': 'flex-shrink'
    },
    'flex': {
        get(value) {
            const spacings = value.trim().split(/\s+/g);

            if (spacings.length === 3) {
                const result = spacings.join(' ');
                if (result === '1 1 0%')
                    return ['flex-1'];
                else if (result === '1 1 auto')
                    return ['flex-auto'];
                else if (result === '0 1 auto')
                    return ['flex-initial'];
            } else if (spacings.length === 1 && spacings[0] === 'none') {
                return ['flex-none']
            }
        }
    },

    /** ocapcity, todo: add numberic get */
    'opacity': {
        get(value) {
            const number = Number.parseFloat(value) * 100;
            return [`opacity-${number}`];
        }
    },

    /** border */
    'borderRadius': {
        '*': 'rounded'
    },
    'borderWidth': {
        '*': 'border'
    },

    /** svg */
    'strokeDasharray': {
        '#': 'stroke-dash'
    },
    'strokeOffset': {
        '#': 'stroke-offset'
    },
    'strokeWidth': {
        '#': 'stroke-width'
    }
}