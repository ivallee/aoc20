const fs = require('fs');
const file = process.argv.slice(2);
let input = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8').trim().split('\n\n');
input = input.map(l => l.split('\n'));

const getUniqueCharacters = (str) => {
  return String.prototype.concat(...new Set(str));
};

function partOne(input) {
  return input.reduce((a, b) => a + getUniqueCharacters(b.join('')).length, 0);
}

function partTwo(input) {
  const charCount = input.map(group => {
    let map = {
      points: 0
    };
    group.forEach(person => {
      person.split('').forEach(letter => {
        if (map[letter]) {
          map[letter] += 1;
        } else {
          map[letter] = 1;
        }
        if (map[letter] === group.length) {
          map.points += 1;
        }
      });
    });
    return map;
  });
  return charCount.reduce((a, b) => a + b.points, 0);
}

console.log(partOne(input));
console.log(partTwo(input));