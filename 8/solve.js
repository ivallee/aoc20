const fs = require('fs');
const file = process.argv.slice(2);
let rules = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8').trim().split('\n');

function run(input) {
  let accumulator = 0;
  let i = 0;
  const commandObj = {};
  while (i < input.length) {
    const command = input[i].split(' ')[0];
    const num = input[i].split(' ')[1];
    if (commandObj[command + i] === 'executed') {
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
  }
}

function replaceCommands(input) {

  let jmps = [];
  let nops = [];
  input.forEach((rule, i) => {
    if (rule.indexOf('jmp') !== -1) {
      jmps.push(i);
    } else if (rule.indexOf('nop') !== -1) {
      nops.push(i);
    }
  })

  try {
    jmps.forEach(cmd => {
      const inputCopy = [...input];
      inputCopy[cmd] = inputCopy[cmd].replace('jmp', 'nop');
      console.log(inputCopy)
      if (run(inputCopy)) {
        throw new Error;
      }
    });
  } catch (e){
    console.log('end')
  }
}

replaceCommands(rules);