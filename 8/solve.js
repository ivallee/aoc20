const fs = require('fs');
const file = process.argv.slice(2);
let rules = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8').trim().split('\n');

// let accumulator = 0;
let accumulator = 0;
let i = 0;
const commandObj = {};

while (i < rules.length) {
  const command = rules[i].split(' ')[0];
  const num = rules[i].split(' ')[1];
  if (commandObj[command + i] === 'second') {
    console.log(accumulator)
    return;
  } else {
    commandObj[command + i] = 'second';
  }

  if (command === 'acc') {
    accumulator += Number(num);
    i++;
  }

  if (command === 'jmp') {
    i += Number(num);
  }

  if (command === 'nop') {
    i++;
  }
}