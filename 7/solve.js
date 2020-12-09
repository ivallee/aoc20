const fs = require('fs');
const file = process.argv.slice(2);
let rules = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8').trim().split('\n');

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
    return false;
  }

  return Object.keys(bag[bagType]).some(containingBag => {

    if (containingBag === targetBag) {
      return true;
    }
    const containingBagObject = getBag(bagTypes, containingBag);
    return containsTargetBag(containingBagObject, targetBag);
  });
};

const countBags = (bag) => {
  const bagName = Object.keys(bag)[0];
  const bagCount = Object.keys(bag[bagName]).reduce((a, b) => a + bag[bagName][b], 0);
  return bagCount;
}

const countBagsRecursively = (bag) => {
  const bagName = Object.keys(bag)[0];
  let bags = countBags(bag);
  if (bags === 0) return 0;
  Object.keys(bag[bagName]).forEach(b => {
    const innerBag = getBag(bagTypes, b)
    const thisBagCount = bag[bagName][b];
    bags += (countBagsRecursively(innerBag) * thisBagCount)
  });
  return bags;
}

console.log(bagTypes.filter(bag => {
  return containsTargetBag(bag, 'shiny gold');
}).length);


console.log(countBagsRecursively(getBag(bagTypes, 'shiny gold')));