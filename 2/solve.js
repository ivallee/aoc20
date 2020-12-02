const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8').trim().split('\n');

const countChars = (str, char) => {
    const regex = new RegExp(char, 'g')
    return str.match(regex) ? str.match(regex).length : 0;
}

function main(arr) {
    var answer = 0;
    var result = arr.map(str => {
        str = str.trim().split(' ');
        return {
            bottomRange: Number(str[0].split('-')[0]),
            topRange: Number(str[0].split('-')[1]),
            char: str[1][0],
            password: str[2],
        };
    });

    result.forEach(obj => {
        var count = countChars(obj.password, obj.char);
        if (count <= obj.topRange && count >= obj.bottomRange) {
            answer++;
        }
    });

    console.log(answer);

}

main(input);