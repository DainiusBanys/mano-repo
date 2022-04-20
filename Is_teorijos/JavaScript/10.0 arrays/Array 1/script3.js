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

console.log(max + "- didziausias skaicius");

let index = randomArr.reduce(function(a, v, i) { if (v === max) a.push(i); return a; }, []);

console.log('max reiksmes/iu indeksas/ai: ' + index);

// let indexSum = randomArr.reduce(function(previous, current, index) { if (index % 2 === 0) console.log(previous, current, index);});

let indexSum = randomArr.reduce(
    (previousValue, currentValue, currentIndex) => {
        return (currentIndex % 2 === 0) ?
            previousValue + currentIndex : previousValue;
    }, 0);

console.log('lyginiu indeksu suma ' + indexSum);

let arrMinusIndex = randomArr.reduce(
    (prev, curr, ind) => {
        prev.push(ind);
        return prev;
    }, 0);


console.log(arrMinusIndex);