const fs = require('fs');
const file = process.argv.slice(2);
let input = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8')
  .trim()
  .split('\n')
  .map(row => row.split(''));

// console.log(input);

const adjacentSeats = (arr, position) => {
  
};

function partOne(grid) {

  grid.forEach((row, i) => {

  });

  return grid;
}

console.log(partOne(input));

// copy grid
  // iterate through first grid while changing copy grid

// a function for counting adjacent seats
  // if condition, change seat of copy array