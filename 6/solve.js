const fs = require('fs');
const file = process.argv.slice(2);
let input = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8').split('\n\n');
input = input.map(l => l.split('\n'));

const countOccurences = (arr, val) => arr.reduce((a, b) => (b === val ? a + 1 : a), 0);

const getUniqueCharacters = (str) => {
  return String.prototype.concat(...new Set(str));
};

function partOne(input) {
  return input.reduce((a, b) => a + getUniqueCharacters(b.join('')).length, 0);
}

console.log(partOne(input))