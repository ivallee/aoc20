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
            return true;
        } else {
            map[target - arr[x]] = x;
        }
    }
    return false;
};

function partOne(input, preamble, index = 0) {
    const position = input[preamble + index];
    const preambleArr = input.slice(index, preamble + index).sort((a, b) => a - b);

    if (!findSumPairs(preambleArr, position)) {
        console.log(input[index + preamble])
        return input[index];
    }
    return partOne(input, preamble, index + 1);
}

partOne(input, 25);