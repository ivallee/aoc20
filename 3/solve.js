const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8').trim().split('\n').map(row => row.split(''));
// const input = fs.readFileSync(`${__dirname}/testInput.txt`, 'utf-8').trim().split('\n').map(row => row.split(''));

const part2Slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
];

function traverseSlope([x, y], [right, down], trees = []) {
    x += right;
    y += down;
    if (y >= input.length) {
        return trees.length;
    }
    // check to see if we've hit the edge of the slope and reset
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
const part2 = part2Slopes.map(arr => traverseSlope([0,0], arr)).reduce((a, b) => a * b);

console.log(part1);

console.log(part2);