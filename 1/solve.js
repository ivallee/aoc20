const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8').split('\n').map(Number);

const testData = ['1721', '979', '366', '299', '675', '1456'].map(Number);

function partOne(data) {
    const answer = data.filter(number => data.filter(n => number + n === 2020).length > 0).reduce((a, b) => a * b);
    console.log(answer);
};

partOne(input);