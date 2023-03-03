#!/usr/bin/env node
const args = require('minimist')(process.argv.slice(2));
const path = require('path');
const fs = require('fs');
const transform = require('@sun-dock/core').default;

const query = args['query'];
const filePath = args['filename'];

if (filePath) {
    formatFile(path.resolve(filePath));
}
if (query) {
    queryResult(query);
}

function formatFile(filePath) {
    fs.readFile(filePath, (err, source) => {
        if (err) throw err;

        const code = transform(source.toString());

        fs.writeFile(filePath, code, (err) => {
            if (err) throw err;
            console.log("transform done.");
        });
    });
}

function queryResult(stylePair) {
    const source = `<div style={{${stylePair}}} />`;
    const result = transform(source);

    console.log(`The input style pair "${stylePair}" will tranform like this: \n ${result}`);
}