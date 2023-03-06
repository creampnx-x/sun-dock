const { output } = require('../../site/webpack.config');

const transform = require('./index').default;

const testSamples = [
    {
        input: `<div style={{ textAlign: 'center' }} />;`,
        output: `className="text-center"`
    },
    {
        input: `<div style={{ textAlign: false }} />;`,
        output: `textAlign: false`
    },
    {
        input: `<div style={{ backgroudUnknow: 'black', textAlign: 'center'  }} />;`,
        output: `className="text-center"`
    },
    {
        input: `<div style={{ padding: '2px' }} />;`,
        output: `className="p-2px"`
    },
    {
        input: `<div style={{ padding: 2 }} />;`,
        output: `className="p-2px"`
    },
    {
        input: `<div style={{ padding: '2px 4px 2px' }} />;`,
        output: `className="pt-2px py-4px pb-2px"`
    },
    {
        input: `<div style={{ strokeWidth: 4 }} />`,
        output: `className="stroke-width-4"`
    },
    {
        input: `<div style={{ strokeWidth: '4' }} />`,
        output: `className="stroke-width-4"`
    },
    {
        input: `<div style={{ textAlign: 'center !important' }} />`,
        output: `className="!text-center"`
    },
    {
        input: `<div style={{ padding: '100%', margin: 'calc(100%)' }} />`,
        output: `className="p-[100%] m-[calc(100%)]"`
    },
    {
        input: `<div style={{ fontWeight: 500 }} />`,
        output: `className="font-500"`
    },
];

((samples) => {
    samples.forEach((sample, index) => {
        const code = transform(sample.input);
        if (code.indexOf(sample.output) !== -1) {
            console.log(`pass => cese ${index} ${code}`);
        } else {
            console.error(`not pass => case ${index}, \n ${code}`);
        }
    })
})(testSamples);