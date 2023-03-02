const { output } = require('../../site/webpack.config');

const transform = require('./index').default;


const testSamples = [
    {
        input: `<div style={{ textAlign: 'center' }} />;`,
        output: `className="text-center"`
    }
];

((samples) => {
    samples.forEach((sample, index) => {
        const code = transform(sample.input);
        if (code.search(output) !== -1) {
            console.log(`pass => cese ${index}`);
        } else {
            console.error(`not pass => case ${index}, \n ${code}`);
        }
    })
})(testSamples);