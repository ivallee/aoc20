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


const validateRange = ({ val, bottom, top}) => {
  return val >= bottom && val <= top;
}

const validateHeight = (height) => {
  const regex = /([0-9]+)(cm|in)/;
  if (regex.test(height)) {
    const matched = height.match(regex);
    const val = Number(matched[1]);
    const measure = matched[2];
    const { bottom, top } = measure === 'in' ? { bottom: 59, top: 76 } : { bottom: 150, top: 193 };
    return validateRange({ val, bottom, top });
  }
  return false;
}

const validateFieldData = (passport) => {
  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = passport;

  if (!byr || !validateRange({ val: Number(byr), bottom: 1920, top: 2002 })) {
    return false;
  }
  if (!iyr || !validateRange({ val: Number(iyr), bottom: 2010, top: 2020 })) {
    return false;
  }
  if (!eyr || !validateRange({ val: Number(eyr), bottom: 2020, top: 2030 })) {
    return false;
  }

  if (!hgt || !validateHeight(hgt)) {
    return false;
  }
  if (!hcl || !/^#[0-9a-f]{6}$/i.test(hcl)) {
    return false;
  }

  const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  if (!ecl || !eyeColors.includes(ecl)) {
    return false;
  }

  if (!pid || pid.length !== 9) {
    return false;
  }
  return true;
};

function part2(input) {
  return parsePassports(input).filter(validateFieldData).length;
}

console.log(part1(input));
console.log(part2(input));
