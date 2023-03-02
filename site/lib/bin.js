const args = require('minimist')(process.argv.slice(2));
const path = require('path');

console.log(path.resolve(args['filename']));
