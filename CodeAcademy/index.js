// function stray(numbers) {
//     let result;
//     numbers.map(el => {
//         // console.log((numbers.indexOf(el)) + ' ' + (numbers.lastIndexOf(el)));

//         if (numbers.indexOf(el) === numbers.lastIndexOf(el)) result = el;
//     })
//     return result;

// };
// console.log(stray([1, 1, 1, 1, 7]));


// function getCount(str) {
//     const vowels = ['a', 'e', 'i', 'o', 'u'];
//     let counter = 0;
//     let splited = str.split('');
//     splited.map(ch => {
//         (vowels.includes(ch)) ? counter++ : counter
//     })
//     return counter;
// }

// console.log(getCount('abracadabra'));

// function getMiddle(s) {
//     return (s.length % 2 === 0) ? s.substr((s.length / 2) - 1, 2) : s.charAt(Math.floor(s.length / 2));
// }

// console.log(getMiddle('testing'));

// function finalGrade(exam, projects) {
//     switch (true) {
//         case (exam > 90 || projects > 10):
//             result = 100;
//             break;
//         case (exam > 75 && projects >= 5):
//             result = 90;
//             break;
//         case (exam > 50 && projects >= 2):
//             result = 75;
//             break;
//         default:
//             result = 0;
//             break;
//     }
//     return result;
// }

// console.log(finalGrade(97, 4));

// function printerError(s) {

//     const goodString = 'aaabbbbhaijjjm';

//     const goodStringSplit = goodString.split('');
//     const inputStringSplit = s.split('');

//     let difference = s.split('').filter(x => !goodStringSplit.includes(x));
//     const result = difference.length + '/' + inputStringSplit.length;
//     return result;
// }

// console.log(printerError('aaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbmmmmmmmmmmmmmmmmmmmxyz'));

// function reverseWords(str) {
//     return str.split(' ').map(w => w.split('').reverse()).map(w => w.join('')).join(' ');
// }

// console.log(reverseWords('hello there!'));

// const arr = N => {
//     return (N >= 0) ? [...new Array(N)].map((el, i) => el = i) : [];

// };

// console.log(arr(3));


// const rps = (p1, p2) => {

//     if (p1 === p2) return 'Draw!';
//     else
//     if (((p1 === 'scissors') && (p2 === 'papers')) || ((p1 === 'rock') && (p2 === 'scissors')) || ((p1 === 'papers') && (p2 === 'rock')))
//         return "Player 1 won!";
//     else
//         return "Player 2 won!";


// };

// console.log(rps('paper', 'scissors'));

// function findUniq(arr) {
//     const resultArray = (arr.filter(el => arr.indexOf(el) === arr.lastIndexOf(el)));
//     return resultArray[0];
// }

// console.log(findUniq([1, 0, 0]));

// function oddOrEven(array) {
//     return (array.reduce((prev, curr) => prev + curr) % 2 === 0) ? 'even' : 'odd';
// }

// console.log(oddOrEven([0, 1, 2, 3, 4, 5]))

// function bubbleSort(arr) {
//     for (let i = 0; i < arr.length; i++) {

//         //Inner pass
//         for (let j = 0; j < arr.length - i - 1; j++) {

//             //Value comparison using ascending order

//             if (arr[j + 1] < arr[j]) {

//                 //Swapping
//                 [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
//             }
//         }
//     };
//     return arr;
// };
// console.log(bubbleSort([9, 3, 8, 4, 6, 1, 0]));

// function solution(string) {
//     return string.split(/(?=[A-Z])/).join(' ');
// }
// console.log(solution('camelCasingTest'));

// String.prototype.toJadenCase = function() {
//     return this.split(' ').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(' ');
// };
// const str = "How can mirrors be real if our eyes arent real";
// console.log(str.toJadenCase());

// function isValidWalk(walk) {

//     let counter = {};
//     walk.forEach(char => { counter[char] = (counter[char] || 0) + 1 })

//     return (walk.length === 10) && (counter.n === counter.s) && (counter.e === counter.w);

// }

// console.log(isValidWalk(['n', 's', 'n', 's', 'n', 's', 'n', 's', 'n', 's']));

// const arr = ['one', 'two', 'one', 'one', 'two', 'three'];

// const count = {};

// console.log(arr.forEach(element => {
//     count[element] = (count[element] || 0) + 1;
// }));

// var uniqueInOrder = function(iterable) {
//     (typeof iterable === 'string') ? input = iterable.split(''): input = iterable;
//     return input.reduce((accumulator, currentValue, index, arr) => {
//         if (currentValue !== arr[index + 1]) {
//             return [...accumulator, currentValue];
//         }
//         return accumulator;
//     }, []);
// }

// console.log(uniqueInOrder('AAAABBBCCDAABBB'));
// console.log(uniqueInOrder([1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 6, 7, 7, 1, 1, 3, 3, 2]));


// const iterable = 'AAAABBBCCDAABBB';
// const myArrayWithNoDuplicates = iterable.split('').reduce((accumulator, currentValue, index, arr) => {
//     if (currentValue !== arr[index + 1]) {
//         return [...accumulator, currentValue];
//     }
//     return accumulator;
// }, []);

// console.log(myArrayWithNoDuplicates);

// function findShort(s) {
//     const min = s.split(' ').reduce((prev, cur) => prev.length <= cur.length ? prev : cur);
//     return min.length;

// }

// console.log(findShort("bibibi take over the world maybe who knows perhapsperhaps"));


// function arrayDiff(a, b) {
//     let result = [];
//     a.map(el => {
//         (!b.includes(el)) ? result.push(el): null;
//     })
//     return result;
// }

// console.log(arrayDiff([1, 2, 3], [3]));

// function disemvowel(str) {
//     const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
//     let result = [];
//     str.split('').map(el => {
//         (vowels.includes(el) ? null : result.push(el))
//     });
//     const joined = result.join('');
//     return joined;
// }

// console.log(disemvowel("This website is for losers LOL!"));

// function countBy(x, n) {
//     let z = [];
//     for (let i = x; i <= n; i += x) {
//         z.push(i);
//     }
//     return z;
// }

// console.log(countBy(2, 10));


// function findOdd(A) {
//     let count = {};

//     A.forEach(element => {
//         count[element] = (count[element] || 0) + 1;
//         return count
//     });
//     const key = Object.keys(count).find((key) => count[key] % 2);
//     return parseInt(key);
// }

// // console.log(findOdd([7]))
// // console.log(findOdd([0, 1, 0, 1, 0]))
// console.log(findOdd([1, 2, 2, 3, 3, 3, 4, 3, 3, 3, 2, 2, 1]))

// //   [7] 
// //   [0,1,0,1,0]
// //   [1,2,2,3,3,3,4,3,3,3,2,2,1]

// function likes(names) {
//     switch (names.length) {
//         case 0:
//             console.log('no one likes this');
//             break;
//         case 1:
//             console.log(names[0] + ' likes this');
//             break;
//         case 2:
//             console.log(names[0] + " and " + names[1] + ' like this');
//             break;
//         case 3:
//             console.log(names[0] + ", " + names[1] + " and " + names[2] + ' like this');
//             break;
//         default:
//             console.log(names[0] + ", " + names[1] + ' and ' + parseInt(names.length - 2) + ' others like this');
//             break;
//     }
// }

// function likes(names) {
//     switch (names.length) {
//         case 0:
//             return 'no one likes this';
//         case 1:
//             return names[0] + ' likes this';
//         case 2:
//             return names[0] + " and " + names[1] + ' like this';
//         case 3:
//             return names[0] + ", " + names[1] + " and " + names[2] + ' like this';
//         default:
//             return names[0] + ", " + names[1] + ' and ' + parseInt(names.length - 2) + ' others like this';
//     }
// }


// likes([]);
// likes(['Peter']);
// likes(['Jacob', 'Alex']);
// likes(["Max", "John", "Mark"]);
// likes(["Alex", "Jacob", "Mark", "Max"]);

// function alphabetPosition(text) {
//     const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
//     let result = text.toLowerCase().split('').map(el => abc.indexOf(el) + 1).filter(elem => elem !== 0).join(' ');
//     return result;
// }



// console.log(alphabetPosition("The sunset sets at twelve o' clock."));
// // "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11"

// function sortArray(array) {
//     let ods = [];
//     let odsInd = [];
//     array.map((el, i) => {
//         if (el % 2 !== 0) {
//             ods = [...ods, el];
//             odsInd = [...odsInd, i]
//         }
//     });
//     ods.sort((a, b) => a - b);
//     ods.map((odd, i) => array[odsInd[i]] = odd);
//     return array;
// }

// console.log(sortArray([5, 3, 2, 8, 1, 4])); // [1, 3, 2, 8, 5, 4]);

function XO(str) {

    const filtered = str.toLowerCase().split('').filter(el =>
        (el === 'x' || el === 'o')
    );
    const count = {};
    filtered.forEach(element => {
        count[element] = (count[element] || 0) + 1;
        return count;
    })
    return (Object.keys(count).length === 0) || (count.x === count.o);
}

console.log(XO('abcdxox'));