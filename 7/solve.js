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
    bagObject[rootBag][firstContainedBag] = Number(firstContainedQuantity.trim());
  }

  if (matched[2]) {
    const secondContainedBag = matched[2][2];
    const secondContainedQuantity = matched[2][1];
    bagObject[rootBag][secondContainedBag] = Number(secondContainedQuantity.trim());
  }
 console.log(matched[3])
  if (matched[3]) {
    const thirdContainedBag = matched[3][2];
    const thirdContainedQuantity = matched[3][1];
    bagObject[rootBag][thirdContainedBag] = Number(thirdContainedQuantity.trim());
  }


  if (matched[4]) {
    const fourthContainedBag = matched[4][2];
    const fourthContainedQuantity = matched[4][1];
    bagObject[rootBag][fourthContainedBag] = Number(fourthContainedQuantity.trim());
  }
  return bagObject;
});

const getBag = (arr, bagName) => {
  return arr.find(bag => Object.keys(bag)[0] === bagName);
};



const containsTargetBag = (bag, targetBag) => {
  const bagType = Object.keys(bag)[0];
  if (Object.keys(bag[bagType]).length === 0) {
    // console.log('you reached the end my friend', bag);
    return false;
  }

  // if (bagType === targetBag) {
  //   console.log('winner!', bag);
  //   return true;
  // }
  return Object.keys(bag[bagType]).some(containingBag => {

    if (containingBag === targetBag) {
      // console.log('winner!', bag);
      return true;
    }
    const containingBagObject = getBag(bagTypes, containingBag);
    // if (Object.keys(containingBagObject)[0] === targetBag) {
    //   console.log('found!');
    //   return true;
    // }
    return containsTargetBag(containingBagObject, targetBag);
  });
  // if (bagObject[bagType][targetBag]) return true;
};

// function containsTargetBah
// const containsTargetBag = (arr, subjectBag, targetBag) => {
//   const bagType = Object.keys(bagObject)[0];
//   const containingBags = Object.keys(bagObject[bagType]);
//   console.log(containingBags)
//   if (bagObject[bagType][targetBag]) return true;


// };
// console.log(getBag(bagTypes, 'shiny gold'));
console.log(bagTypes.filter(bag => {
  return containsTargetBag(bag, 'shiny gold');
}).length);