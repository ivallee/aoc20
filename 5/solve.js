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

function partOne (input) {
  const answer = input.map(pass => {
    const row = partition(pass.row.split(''), 0, 0, 127)
    const col = partition(pass.col.split(''), 0, 0, 7);
    return (row * 8) + col;
  });

  return Math.max(...answer);
}

console.log(partOne(input));

