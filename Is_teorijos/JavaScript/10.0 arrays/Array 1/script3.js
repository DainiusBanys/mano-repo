// 1

let randomArr = new Array(30)
    .fill()
    .map(() => 5 + (Math.floor(Math.random() * 20)));

console.log(randomArr);

// 2

let tenPlus = randomArr
    .filter(item => item > 10)
    .length;

// console.log(tenPlus);

let max = Math.max(...randomArr);

console.log(max, randomArr.indexOf(max));

console.log(randomArr.reduce((previous, current, index) => { return Math.max(previous, current) }));

let index = [];
index = randomArr.reduce(function(a, v, i) { if (v === max) a.push(i); return a; }, []);

console.log(index);