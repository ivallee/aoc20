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

const countOccurences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

const getGraph = (number, i, arr) => {
    console.log(number)
    // const diff = arr[i + 1] - number;
    // console.log(diff)
    let obj = {};
    obj[number] = arr.filter(num => {
        console.log('nummies', num - number )
        return (num - number) > 0 && (num - number) <= 3;
    });
    return obj;
}

function partOne(input) {
    let adapters = [...input];
    adapters.unshift(0);
    const diffs = adapters.sort((a, b) => a - b).map(getDiffs);
    return countOccurences(diffs, 1) * countOccurences(diffs, 3)
}

function partTwo(input) {
    let adapters = [...input];
    adapters.unshift(0);
    adapters.push(Math.max(...adapters) + 3);
    const graph = adapters.sort((a, b) => a - b).map(getGraph);
    console.log(graph)
    // console.log(graph)
}

const one = partOne(data);
console.log(one);
console.log(partTwo(data))