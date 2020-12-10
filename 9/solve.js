const fs = require('fs');
const file = process.argv.slice(2);
let input = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8').trim().split('\n').map(Number);

const findSumPairs = (arr, target) => {
    const map = [];
    const indexnum = [];

    for (let x = 0; x < arr.length; x++) {
        if (map[arr[x]] != null) {
            var index = map[arr[x]];
            indexnum[0] = index;
            indexnum[1] = x;
            return indexnum;
        } else {
            map[target - arr[x]] = x;
        }
    }
    return false;
};

const findContiguousSet = (arr, target) => {
    var size = 2;
    var index = 0;
    let sum = 0;
    let range = [];
    let going = true;

    while (going) {
        range = arr.slice(index, size);
        sum = range.reduce((a, b) => a + b, 0);
        if (sum > target) {
            size = 2;
            index++;
        }
        if (sum === target) {
            going = false;
            break;
        } else {
            size++;
        }
    }
    return range;
};

function partOne(input, preamble, index = 0) {
    const position = input[preamble + index];
    const preambleArr = input.slice(index, preamble + index).sort((a, b) => a - b);

    if (!findSumPairs(preambleArr, position)) {
        return input[index + preamble];
    }
    return partOne(input, preamble, index + 1);
}

function partTwo(input, target) {
    const sumset = findContiguousSet(input, target).sort((a,b) => a - b);

    return sumset[0]  + sumset[sumset.length - 1];
}

const one = partOne(input, 25);
const two = partTwo(input, one);
console.log(one);
console.log(two);
