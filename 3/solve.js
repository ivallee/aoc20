const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/testInput.txt`, 'utf-8').trim().split('\n').map(row => row.split(''));

function traverseSlope([x, y], [right, down], trees = []) {
    x += right;
    y += down;
    if (y >= input.length) {
        return trees.length;
    }
    if (x >= input[y].length) {
        const diff = x - input[y].length;
        x = diff;
    }

    const currentPosition = input[y][x];
    if (currentPosition === '#' ){
        trees.push(currentPosition)
    }
    return traverseSlope([x, y], [right, down], trees);
}

const part1 = traverseSlope([0,0], [3, 1]);

console.log(part1);