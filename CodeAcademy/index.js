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


const rps = (p1, p2) => {

    if (p1 === p2) return 'Draw!';
    else
    if (((p1 === 'scissors') && (p2 === 'papers')) || ((p1 === 'rock') && (p2 === 'scissors')) || ((p1 === 'papers') && (p2 === 'rock')))
        return "Player 1 won!";
    else
        return "Player 2 won!";


};

console.log(rps('paper', 'scissors'));