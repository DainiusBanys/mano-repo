// 1

const fruit = new Array('cherry', 'apple', 'pear');
// console.log(fruits);

// 2

const array1 = [0, 1, 2];
const array2 = [
    3,
    4,
    5
];
const array3 = [];
array3[0] = 6;
array3[1] = 7;
array3[2] = 8;

const array4 = new Array(9, 10, 11);

// console.log(array1, array2, array3, array4);

// 3

const fruits = new Array('cherry', 'apple', 'pear');
// console.log(fruits[0], fruits[fruits.length - 1]);

// 5

const frutto = new Array('cherry', 'apple', 'pear');
// console.log(frutto);
frutto[1] = 'plum';
frutto.splice(2, 1, 'peach');
// console.log(frutto);

// 6

// console.log(frutto.length);

// 7

frutto.push('strawberry');
// console.log(frutto);

// 8 

frutto.unshift('watermellon');
// console.log(frutto);

// 9

frutto.pop();
// console.log(frutto);

// 10

// console.log(frutto);
let y = 0;
let frutti = [];
for (let i = 1; i <= (frutto.length - 1); i = i + 2) {
    frutti[y] = frutto[i];
    y++;

};
// console.log(frutti);

// 11

// console.log(frutto);
// console.log(frutto.reverse());

// 12

// console.log(frutto);

let fruttoSplit = []
for (let i = 0; i <= frutto.length - 1; i++) {

    fruttoSplit[i] = frutto[i].split('').reverse().join('');

}
// console.log(fruttoSplit);

// 13

const arr1 = ['ant', 'bison', 'camel', 'duck', 'bison'];
const arr2 = ['horse', 'cow', 'cat'];
const arr3 = [].concat(arr1, arr2);
// console.log(arr3);

// 14

const numbers = [];
for (let i = 0; i <= 200; i++) {
    numbers.push(i);
}
// console.log(numbers);

// 15

const doubleArr = numbers.map(myFunction)

function myFunction(num) {
    return num * 2;
}
// console.log(doubleArr);