function makeAnArray(...args) {
  return [...args];
}
console.log("******* 1 *******");
console.log(makeAnArray(1, 2, 4, 10));
console.log(makeAnArray(4, 3));

console.log("******* 2 *******");

const incrementItems = arr => arr.map(el => el + 1);

console.log(incrementItems([0, 1, 2, 3]));

console.log("******* 3 *******");


const arrayValuesTypes = arr => arr.map(el => typeof el);

const arrayValuesTypes2 = (...args) => [...args].map(el => typeof el);


console.log("******* 4 *******");

const rutina = [
      'Kelimasis',
      'Manksta',
      'Pusryciai',
      'Darbas',
      'Poilsis',
      'Miegas'
    ];

rutina.splice(4, 0, 'Pietus', 'Dar biskeli Darbas');

console.log(rutina);

rutina.splice(1,1);

console.log(rutina);

const removeLastTwo = (arr) => {
  const newArr = arr.slice();
  newArr.splice(-2, 2);
  return newArr;
}

const removeLastTwo2 = (arr) => arr.slice(0, -2);

console.log(removeLastTwo(rutina));
console.log(removeLastTwo2(rutina));
console.log(removeLastTwo([1,3, 4]))


console.log("******* 5 *******");

const fruits = ["Banana", "Orange", "Apple", "Mango"];

const fruitsBasket = fruits.slice();
const fruitsBasket2 = [...fruits];

fruits.push('blueberies');
console.log(fruits);
console.log(fruitsBasket);

console.log([...fruits].splice(1, 2));

const modifiedFruits = fruits.map(word => word[0].toUpperCase() + word.slice(1));

console.log(
  modifiedFruits.sort()
);

const compare = (a, b) => a > b ? -1 : 1;

console.log(modifiedFruits.sort(compare));

console.log("******* 6 *******");

const cities = [
    'New Haven', 'Costa Mesa', 'Fremont', 'Irvine', 'Macon', 'Cambridge', 'Pueblo', 'Kailua', 'Chula Vista', 'Cathedral City', 'Modesto', 'Montgomery', 'Elkhart', 'Fairfield', 'Frederick', 'Jacksonville', 'Pensacola', 'North Port', 'Muskegon', 'Lakeland', 'Cape Coral', 'Hickory', 'Reno', 'Norfolk', 'Hesperia', 'Fort Walton Beach', 'Independence', 'Concord', 'Port Orange', 'Portsmouth', 'Escondido', 'Appleton', 'Downey', 'Clarksville', 'Ontario', 'Mesa', 'Philadelphia', 'Lubbock', 'Provo', 'Roseville', 'New Orleans', 'Lewisville', 'Nashua', 'Hayward', 'Dayton', 'McAllen', 'Fort Smith', 'Athens', 'Havre de Grace', 'Boston', 'Redding', 'Salt Lake City', 'Newburgh', 'Little Rock', 'New London', 'Bonita Springs', 'Amarillo', 'Greenville', 'Fresno', 'Billings', 'Orlando', 'Kissimmee', 'Las Cruces', 'Anaheim', 'McHenry', 'Fontana', 'Odessa', 'Memphis', 'Ann Arbor', 'Poughkeepsie', 'Hemet', 'Danbury', 'Lakewood'
  ];

console.log(
  cities
  .sort((a, b) => a.slice(-1) > b.slice(-1) ? 1 : -1)
  .map(word => {
    const w = word
      .toLowerCase()
      .split('')
      .reverse()
      .join('');
    return w[0].toUpperCase() + w.slice(1);
  })
);

console.log(
  cities.map(word => word[0].toLowerCase())
)

function filterCity(letter, arr) {
  return arr.filter(word => word[0].toLowerCase() === letter)
}

console.log(
  findCity('a', cities)
);


function findCity(name, arr) {
  // return arr.includes(name);
  // return arr.some(name);
  // return arr.find((city) => city === name);
  arr.find((city) => city === name) ? console.log("miestas yra") : console.log("miesto nera");
}