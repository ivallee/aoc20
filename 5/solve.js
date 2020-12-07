const fs = require('fs');
const file = process.argv.slice(2);
let input = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8')
  .trim()
  .split('\n')
  .map(entry => {
    const row = entry.slice(0, 7);
    const col = entry.slice(-3);

    return { row, col };
});

const partition = (arr, index = 0, start, end) => {
  let mid = Math.floor((start + end) / 2);

  if (mid >= end) return end;

  if (arr[index] === 'F' || arr[index] === 'L') {
    return partition(arr, index + 1, start, mid);
  } else {
    return partition(arr, index + 1, mid + 1, end);
  }
};

const getSeatIDs = (pass) => {
  const row = partition(pass.row.split(''), 0, 0, 127)
  const col = partition(pass.col.split(''), 0, 0, 7);
  return (row * 8) + col;
};

const findMissing = (arr) => {
  return arr.filter((num, i) => num + 1 !== arr[i + 1] && arr[i + 1] !== undefined );
};

function partOne(input) {
  return Math.max(...input.map(getSeatIDs));
}

function partTwo(input) {
  const seatIDs = input.map(getSeatIDs).sort((a, b) => a - b);
  return findMissing(seatIDs)
}

console.log(partOne(input));
console.log(partTwo(input));

