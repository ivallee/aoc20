const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf-8').split('\n').map(Number);
const testInput = ['1721', '979', '366', '299', '675', '1456'].map(Number);

const target = 2020;

const partTwoReducer = (accumulator, currentValue, currentIndex, array) => {
    const a = currentValue ;
    let indexB = currentIndex + 1;
    let indexC = array.length - 1;
    console.log('make it DROP')

    // if (a > target) return currentValue;
    // if (a === array[currentIndex - 1]) return;
    while (indexB < indexC) {
        const b = array[indexB];
        const c = array[indexC];
        console.log(currentIndex, indexB, indexC)
        // console.log(a + b + c)
        if ((a + b + c) === target) {
            console.log('bingo!')
            accumulator.push(a);
            accumulator.push(b);
            accumulator.push(c);
            return accumulator;
            // return a * b * c;
        }
        if ((a + b + c) > target) {
            console.log('downy')
            while (array[indexC - 1] === c) { indexC--; }
            console.log('gord downie?')
            indexC--;
        }
        if ((a + b + c) < target) {
            console.log('uppy')
            while (array[indexB + 1] === b) { indexB++ }
            indexB++
        }

    }
    return accumulator;
}

function partOne(data) {
    const answer = data.filter(number => data.filter(n => number + n === target).length > 0).reduce((a, b) => a * b);
    console.log(answer);
};

function partTwo(data) {
    const sorted = data.sort((a, b) => 1 - b);

    sorted.forEach((num, i) => {
        sorted.forEach((num2, j) => {
            sorted.forEach((num3, k) => {
                // console.log(num + num2 + num3 === target)
                if (num + num2 + num3 === target) {
                    console.log(num * num2 * num3)
                }
            });
        });
    });

    // const answer = sorted.reduce(partTwoReducer, []);

    // const result = [];
    // for (let i = 0; sorted.length; i++) {
    //     const num = sorted[i];

    //     let num2 = i + 1;
    //     let num3 = sorted.length - 1;

    //     while ()
    // }

    // sorted.forEach((num, i) => {
    //     if (num > target) return;
    // });
    // console.log(answer);
}

partOne(input);
partTwo(input);
// partTwo(testInput);