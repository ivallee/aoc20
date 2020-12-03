const fs = require('fs');
// const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8').trim().split('\n');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8').trim().split('\n');

const countChars = (str, char) => {
    const regex = new RegExp(char, 'g')
    return str.match(regex) ? str.match(regex).length : 0;
}

const position = ({ positionOne, positionTwo, char, password }) => {
    const firstMatch = password[positionOne - 1] === char;
    const secondMatch = password[positionTwo - 1] === char;

    if (!firstMatch && !secondMatch) {
        return false
    } else if (firstMatch && secondMatch) {
        return false;
    } else if (firstMatch) {
        return true;
    } else if (secondMatch) {
        return true;
    }
};

function partOne(arr) {
    let answer = 0;
    const result = arr.map(str => {
        str = str.trim().split(' ');
        return {
            bottomRange: Number(str[0].split('-')[0]),
            topRange: Number(str[0].split('-')[1]),
            char: str[1][0],
            password: str[2],
        };
    });

    result.forEach(obj => {
        const count = countChars(obj.password, obj.char);
        if (count <= obj.topRange && count >= obj.bottomRange) {
            answer++;
        }
    });

    console.log(answer);

}

function partTwo(arr) {
    const result = arr.map(str => {
        str = str.trim().split(' ');
        return {
            positionOne: Number(str[0].split('-')[0]),
            positionTwo: Number(str[0].split('-')[1]),
            char: str[1][0],
            password: str[2],
        };
    }).filter(position).length;

    console.log(result);

}

partOne(input);
partTwo(input);