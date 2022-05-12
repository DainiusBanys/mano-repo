const names = 'Jeremy';
const surname = 'Irons';
let initials;
initials = names.substring(0, 1) + surname.substring(0, 1);
console.log(initials);

// -------------------------------------------------------

let n = 1;
let array = [];
while (n <= 3000) {
    if (n % 77 === 0) {
        array.push(n);
    };
    n++
};
console.log(array);

// -------------------------------------------------------

var text;
var char_list = 'ABCD';
var arr = new Array(200).fill(0);
text = () => { character = char_list.charAt(Math.floor(Math.random() * char_list.length)); return character };

// for (let i = 0; i <= 200; i++) {
//     arr[i] = text();
// }

let masyvas = arr.map(() => { return text() });



console.log('A: ' + masyvas.filter(charac => { return charac === 'A' }).length);
console.log('B: ' + masyvas.filter(charac => { return charac === 'B' }).length);
console.log('C: ' + masyvas.filter(charac => { return charac === 'C' }).length);
console.log('D: ' + masyvas.filter(charac => { return charac === 'D' }).length);