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

const findContiguousSet = (arr, target, size = 2, index = 0) => {
    const sliced = arr.slice(index, size);
    const sum = sliced.reduce((a, b) => a + b, 0);
    // console.log(sliced);
    // console.log(sum)
    console.log(sliced.length, index, sum)
    if (sum > target) {
        return findContiguousSet(arr, target, 2, index + 1)
    } else if (sum === target) {
        // const sorted = sliced.sort((a, b) => a - b);

        // console.log(sliced[0], sliced[sliced.length-1])
        return sliced;
    } else {
        // console.log('ouutttaa heeere!')
        return findContiguousSet(arr, target, size + 1, index)
    }
    // return findContiguousSet('')
};

const findConiguous = (arr, target) => {
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
            console.log('sum', sum);
            going = false;
            break;
        } else {
            size++;
        }


    }
    console.log('sum', sum)
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
    return target;
}

const partone = partOne(input, 25);
console.log(partone);
// console.log(partTwo(input, partOne(input, 25)));
let partwo = findConiguous(input, partone);
partwo = partwo.sort((a, b) => a - b);
console.log(partwo[0])
console.log(partwo[partwo.length - 1])
console.log(partwo[0] + partwo[partwo.length - 1]);

// console.log(findContiguousSet(input, 127))