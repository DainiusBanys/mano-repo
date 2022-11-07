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

function finalGrade(exam, projects) {
    switch (true) {
        case (exam > 90 || projects > 10):
            result = 100;
            break;
        case (exam > 75 && projects >= 5):
            result = 90;
            break;
        case (exam > 50 && projects >= 2):
            result = 75;
            break;
        default:
            result = 0;
            break;
    }
    return result;
}

console.log(finalGrade(97, 4));