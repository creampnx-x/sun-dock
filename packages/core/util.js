/**
 * 
 * @param {string} source 
 */
exports.formatString = (source) => {
    if (source.indexOf('%') !== -1 || source.indexOf('calc') !== -1)
        return `[${source}]`;
    return source;
}