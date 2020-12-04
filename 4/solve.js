const fs = require('fs');
const file = process.argv.slice(2);
const input = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8').trim();

let reqFields = [];
const optionalField = 'cid';

const parsePassports = (inputArr) => {
  return inputArr.split('\n\n').map(fields => {
    const regex = /[\s\n]/;
    const passport = {};

    fields.split(regex).forEach(field => {
      field = field.split(':');
      const key = field[0];
      const value = field[1];
      passport[key] = value;
      if (key !== optionalField && !reqFields.includes(key)) {
        reqFields.push(key);
      }
    });
    return passport;
  });
}

const validatePassports = (passport) => {
  const passportFields = Object.keys(passport);
  invalid = reqFields.some(key => {
    return key !== optionalField && !passportFields.includes(key)
  });
  return !invalid;
};

function part1(input) {
  return parsePassports(input).filter(validatePassports).length;
}

console.log(part1(input));