const fs = require('fs');
const file = process.argv.slice(2);
let input = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8').trim().split('\n').map(Number);

const sum = (a , b) => {
    return a + b;
};

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

const findContiguousSet = (arr, target, size = 2, index = 0) => {
    const sliced = arr.slice(index, size);
    const sumnum = sliced.reduce(sum, 0);
    // console.log(sliced);
    // console.log(sumnum)
    if (sumnum > target) {
        return findContiguousSet(arr, target, 2, index + 1)
    } else if (sumnum === target) {
        const sorted = sliced.sort((a, b) => a - b);
        
        // console.log(sliced[0], sliced[sliced.length-1])
        return sorted[0] + sorted[sorted.length - 1];
    } else {
        // console.log('ouutttaa heeere!')
        return findContiguousSet(arr, target, size + 1, index)
    }
    // return findContiguousSet('')
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
    return target;
}

const partone = partOne(input, 5);
console.log(partone);
// console.log(partTwo(input, partOne(input, 25)));
const partwo = findContiguousSet(input, partone)
console.log(partwo);

// console.log(findContiguousSet(input, 127))