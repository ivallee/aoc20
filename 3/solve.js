const fs = require('fs');
// const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8').trim().split('\n');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8').trim().split('\n').map(row => row.split(''));

function traverseSlope([right, down], trees = []) {

    if (down >= input.length) {
        console.log(trees.length);
        return trees.length;
    }
    if (right >= input[down].length) {
        console.table([right, input[down].length])
        const diff = right - input[down].length;
        console.log('DIFF: ', diff);
        right = diff;
    }

    const currentPosition = input[down][right];

    if (currentPosition === '#' ){
        trees.push(currentPosition)
    }

    traverseSlope([right + 3, down + 1], trees);
}

traverseSlope([3, 1]);