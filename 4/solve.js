const fs = require('fs');
const file = process.argv.slice(2);
const input = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8').trim();

const passports = input.split('\n\n').map(passport => {
  const regex = /[\s\n]/;
  const obj = {};
  
  passport.split(regex).forEach(field => {
    field = field.split(':');
    const key = field[0];
    const value = field[1];
    obj[key] = value;
  });
  return obj;
});

console.log(passports);