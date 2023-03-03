const args = require('minimist')(process.argv.slice(2));
const path = require('path');
const fs = require('fs');
const transform = require('@sun-dock/core').default;

const filePath = path.resolve(args['filename']);

fs.readFile(filePath, (err, source) => {
    if (err) throw err;

    const code = transform(source);

    fs.writeFile(filePath, code, (err) => {
        if (err) throw err;
        console.log("transform done.");
    });
});