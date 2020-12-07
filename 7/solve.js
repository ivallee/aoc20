const fs = require('fs');
const file = process.argv.slice(2);
let rules = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8').trim().split('\n');

// separate rules
// regex 2 words + bags
// parse bags into keys

// map each rule, parsing bags along the way.
  // return what each bag contains 

const bagTypes = rules.map(rule => { 
  // const bag = `${rule.split(' ')[0]} ${rule.split(' ')[1]}`;
  const regex = /(\d\s)?(\w+\s\w+)(?= +bag|bags\b)/g;
  const matched = [...rule.matchAll(regex)];
  console.log(matched)
  // first element is key
  const example = {
    'light red': {
      'bright white': 1,
      'muted yellow': 2
    }
  }
  // return { bag };
});
console.log(bagTypes)