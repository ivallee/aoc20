const fs = require('fs');
const file = process.argv.slice(2);
const input = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8').trim();

let reqFields = [];
const optionalField = 'cid';

const passports = input.split('\n\n').map(fields => {
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

const validPassports = passports.filter(passport => {
  const passportFields = Object.keys(passport);
  invalid = reqFields.some(key => {
    console.log(key !== optionalField && !passportFields.includes(key), key, 'invalid!!!')
    return key !== optionalField && !passportFields.includes(key)
  });
  return !invalid;
});

console.log(validPassports.length);