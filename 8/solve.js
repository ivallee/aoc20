const fs = require('fs');
const file = process.argv.slice(2);
let rules = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8').trim().split('\n');

function run(input) {
  let accumulator = 0;
  let i = 0;
  const commandObj = {};
  while (i < input.length) {
    // console.log(input[i], accumulator)
    const command = input[i].split(' ')[0];
    const num = input[i].split(' ')[1];
    if (commandObj[command + i] === 'executed') {
      console.log('repeat')
      return false;
    } else {
      commandObj[command + i] = 'executed';
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

    if (i === input.length) {
      console.log('done!!!', accumulator)
      return true;
    }
    // console.log('final', accumulator)
  }
}

let valid = false;
let i = 0;

while (valid === false) {
  // console.log(i, rules.length)
  if (run(rules)) {
    valid = true;
  // } else if (rules[i].indexOf('jmp') !== -1) {
  //   console.log('replacing jmp')
  //   rules[i] = rules[i].replace('jmp', 'nop');
  // }
  } else if (rules[i].indexOf('nop') !== 1) {
    console.log('replacing nop')
    rules[i] = rules[i].replace('nop', 'jmp');
  }
  i++;
}

function recursiveRun() {
  
  if (run)
}

// console.log(run(rules))
// run(rules)

