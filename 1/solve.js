const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8').split('\n').map(Number);

const testData = ['1721', '979', '366', '299', '675', '1456'].map(Number);

function sum(a, b) {

    if (number === 2020) {
        return number;
    } else {
        sum()
    }
}

function main(data) {
    var arr;

    const answer = data.filter(number => {
        return data.filter(n => number + n === 2020).length > 0;
    }).reduce((a, b) => a * b);

    // let sum = data.reduce((a,b) => {
    //     a = Number(a);
    //     b = Number(b);
    //     console.log(`a: ${a}\nb: ${b}`);
    //     console.log(`a + b = ${a + b}`);
    //     if (a + b === 2020) {
    //         return a * b;
    //     } else {
    //         return a;
    //     };
    // });

    console.log(answer);
};

main(input);