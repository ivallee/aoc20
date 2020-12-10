const fs = require('fs');
const file = process.argv.slice(2);
let input = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8')
    .trim()
    .split('\n')
    .map(Number)
    .sort((a, b) => a - b);


const getDiffs = (number, i) => {
    if (input[i + 1]) {
        const diff = input[i + 1] - number;
        return diff;
    } else {
        return 3;
    }
};

const countOccurences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

function partOne(input) {
    input.unshift(0);
    const diffs = input.map(getDiffs);
    return countOccurences(diffs, 1) * countOccurences(diffs, 3)
}

const one = partOne(input);
console.log(one);