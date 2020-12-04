const fs = require('fs');
const file = process.argv.slice(2);
const input = fs.readFileSync(`${__dirname}/${file}.txt`, 'utf-8').trim();

const passports = input.split('\n\n').map(passport => {
  const regex = /[\s\n]/;
  return passport.split(regex).map(field => {
    const key = field.split(':')[0];
    const value = field.split(':')[1];
    return {
      key,
      value
    }
  });
});

console.log(passports);