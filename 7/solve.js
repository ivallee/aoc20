const fs = require('fs');
const file = process.argv.slice(2);
let rules = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8').trim().split('\n');

// separate rules
// regex 2 words + bags
// parse bags into keys

// map each rule, parsing bags along the way.
  // return what each bag contains

const bagTypes = rules.map(rule => {
  const regex = /(\d\s)?(\w+\s\w+)(?= +bag|bags\b)/g;
  let matched = [...rule.matchAll(regex)];

  let bagObject = {};
  const rootBag = matched[0][2];
  bagObject[rootBag] = {};
  const firstContainedBag = matched[1][2];
  const firstContainedQuantity = matched[1][1];

  if (firstContainedBag && firstContainedBag === 'no other') {
    return bagObject;
  } else {
    bagObject[rootBag][firstContainedBag] = firstContainedQuantity;
  }

  if (matched[2]) {
    const secondContainedBag = matched[2][2];
    const secondContainedQuantity = matched[2][1];
    bagObject[rootBag][secondContainedBag] = secondContainedQuantity;
  }
  return bagObject;
});
console.log(bagTypes)