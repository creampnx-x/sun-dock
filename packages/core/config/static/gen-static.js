#!/usr/bin/env node
/** this is only running on node.js */
const fs = require('fs');
const static = require('./origin-static').default;

const map = {};
Object.keys(static).forEach((key) => {
    const result = key;
    const propObject = static[key].utility;
    const keys = Object.keys(propObject);
    // todo：如果大于两个且其他的不包含最短的那个就抛弃
    if (keys.length > 1) {
        let signal = false;
        const lastProp = keys[keys.length - 1];
        keys.forEach((restProp) => {
            if (restProp.search(lastProp) === -1) {
                signal = true;
            }
        })

        if (signal) return;
    }

    const prop = keys[keys.length - 1];
    const value = propObject[prop];

    const valueIsArray = Array.isArray(value);

    let formatProp = prop;
    if (formatProp.search('-') !== -1) {
        let i = formatProp.indexOf('-');
        while (i !== -1) {
            formatProp = formatProp.replace('-', '');
            formatProp = formatProp.substring(0, i) + formatProp[i].toUpperCase() + formatProp.substring(i + 1);
            i = formatProp.indexOf('-');
        }
    }
    // todo: ugly code.
    if (map[formatProp]) {
        if (valueIsArray) {
            value.forEach((v) => {
                map[formatProp][v] = result;
            });
        } else map[formatProp][value] = result;
    } else {
        if (valueIsArray) {
            map[formatProp] = {};
            value.forEach((v) => {
                map[formatProp][v] = result;
            });
        }
        else map[formatProp] = {
            [value]: result
        };
    }
});

fs.writeFile('./static-config.json', JSON.stringify(map), (err) => {
    if (err) throw err;
});