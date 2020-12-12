const fs = require('fs');
const file = process.argv.slice(2);
let input = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8')
  .trim()
  .split('\n')
  .map(row => row.split(''));

// deep equals taken from stack overflow
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array)
      return false;

  // compare lengths - can save a lot of time 
  if (this.length != array.length)
      return false;

  for (var i = 0, l=this.length; i < l; i++) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
          // recurse into the nested arrays
          if (!this[i].equals(array[i]))
              return false;       
      }           
      else if (this[i] != array[i]) { 
          // Warning - two different object instances will never be equal: {x:20} != {x:20}
          return false;   
      }           
  }       
  return true;
}

const adjacentSeats = (grid, startY, startX) => {
  const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  let occupied = 0;
  let empty = 0;
  for (let i = 0; i < directions.length; i++) {
    const [y, x] = directions[i];
    if (grid[startY + y] && grid[startY + y][startX + x]) {
      const spot = grid[startY + y][startX + x];
      if (spot === '#') {
        occupied++;
      }
      if (spot === 'L') {
        empty++
      }

    }
  }
  return {
    occupied,
    empty,
  };
};

const cycleSeats = (grid) => {
  let gridCopy = grid.map(row => row.slice());
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const seat = grid[i][j];
      const { occupied, empty } = adjacentSeats(grid, i, j);
      if (seat === 'L' && occupied === 0) {
        gridCopy[i][j] = '#';
      } else if (seat === '#' && occupied >= 4) {
        gridCopy[i][j] = 'L';
      }
    }
  }
  return gridCopy;
}

const recursiveCycle = (arr) => {
  const cycled = cycleSeats(arr);
  if (cycled.equals(arr)) {
    return arr;
  }
  return recursiveCycle(cycled);
};

const countOccurences = (arr, val) => arr.reduce((a, b) => (b === val ? a + 1 : a), 0);

function partOne(grid) {
  const finalSeats = recursiveCycle(grid);
  return finalSeats.reduce((a, b) => a + countOccurences(b, '#'), 0);
 
}

console.log(partOne(input));