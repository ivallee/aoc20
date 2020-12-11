const fs = require('fs');
const file = process.argv.slice(2);
let data = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8')
    .trim()
    .split('\n')
    .map(Number);

const getDiffs = (number, i, arr) => {
    if (arr[i + 1]) {
        const diff = arr[i + 1] - number;
        return diff;
    } else {
        return 3;
    }
};

const countOccurences = (arr, val) => arr.reduce((a, b) => (b === val ? a + 1 : a), 0);

function partOne(input) {
    let adapters = [...input];
    adapters.unshift(0);
    const diffs = adapters.sort((a, b) => a - b).map(getDiffs);
    return countOccurences(diffs, 1) * countOccurences(diffs, 3)
}

function partTwo(input) {
    const adapters = [...input];
    let combos = adapters.sort((a, b) => a - b).reduce((acc, adapter) => {
        const optionOne = acc[adapter - 3] ? acc[adapter - 3] : 0;
        const optionTwo = acc[adapter - 2] ? acc[adapter - 2] : 0;
        const optionThree = acc[adapter - 1] ? acc[adapter - 1] : 0;

        acc[adapter] = optionOne + optionTwo + optionThree;
        return acc;
    }, [1]);
    return combos[combos.length - 1];
}

const one = partOne(data);
console.log(one);
const two = partTwo(data);
console.log(two);