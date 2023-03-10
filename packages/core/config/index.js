const staticProps = require('./static/static-config.json');
const dynamic = require('./dynamic/index').default;
/**
 * 1. `data` static style map. like: textAlign: center.
 * 2. `*`: `sample` => numberic value, should add 'px' sufix.
 * 3. `#`: `sample` => numberic value, but not 'px' sufix.
 * 4. `get() return []` => string value should be parse.
 */
exports.map = {
    ...staticProps,
    ...dynamic
};