#!/usr/bin/env node

const args = require('minimist')(process.argv.slice(2));
const path = require('path');
const fs = require('fs');
const transform = require('@sun-dock/core').default;

const filePath = path.resolve(args['filename']);
console.log(filePath, "ffff");
fs.readFile(filePath, (err, source) => {
    if (err) throw err;

    console.log(source.toString());
    const code = transform(source.toString());

    fs.writeFile(filePath, code, (err) => {
        if (err) throw err;
        console.log("transform done.");
    });
});