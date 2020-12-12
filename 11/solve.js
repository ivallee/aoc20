const fs = require('fs');
const file = process.argv.slice(2);
let input = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8')
  .trim()
  .split('\n')
  .map(row => row.split(''));

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

const adjacentSeats = (grid, startX, startY) => {
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
    empty
  };
};

const cycleSeats = (grid) => {
  let gridCopy = grid.map(row => row.slice());
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const { occupied, empty } = adjacentSeats(grid, i, j);
      const seat = grid[i][j];
      if (seat === 'L' && occupied === 0) {
        gridCopy[i][j] = '#';
      } else if (seat === '#' && occupied >= 4) {
        gridCopy[i][j] = 'L';
      }
    }
  }
  return gridCopy;
}

function partOne(grid) {
  const cycled = cycleSeats(grid);

  // compare arrays
  // repeat until stops changing
  // count occupied seats
  console.log(cycled)
  console.log(grid)
  console.log(grid.equals(grid))
}

console.log(partOne(input));

// copy grid
  // iterate through first grid while changing copy grid

// a function for counting adjacent seats
  // if condition, change seat of copy array