const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8').split('\n').map(Number);
const testInput = ['1721', '979', '366', '299', '675', '1456'].map(Number);

const target = 2020;

function partOne(data) {
    const answer = data.filter(number => data.filter(n => number + n === target).length > 0).reduce((a, b) => a * b);
    console.log(answer);
};

function partTwo(data) {
    const sorted = data.sort((a, b) => 1 - b);

    let answer;

    sorted.forEach((num, i) => {
        sorted.forEach((num2, j) => {
            sorted.forEach((num3, k) => {
                if (num + num2 + num3 === target) {
                    answer = num * num2 * num3;
                }
            });
        });
    });

    console.log(answer);
}

partOne(input);
partTwo(input);