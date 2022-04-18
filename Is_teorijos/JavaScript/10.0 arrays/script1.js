// 1

makePair = (a, b) => {
    return new Array(a, b);
};

// console.log(makePair(2, 4));
// console.log(makePair(51, 21));
// console.log(makePair(512124, 215));

// 2

incrementItems = (num) => {
        let plusOne = num.map(function(element) {
            element++;
            return element;
        })
        console.log(plusOne);
    }
    // incrementItems([0, 1, 2, 3]);
    // incrementItems([2, 4, 6, 8]);
    // incrementItems([-1, -2, -3, -4]);

// 3

arrayValuesTypes = (elem) => {
        const types = elem.map(function(element) {
            return typeof(element);
        })
        console.log(types);
    }
    // arrayValuesTypes([1, 2, "null", []]);
    // arrayValuesTypes(["214", true, false, 2, 2.15, [], null]);
    // arrayValuesTypes([21.1, "float", "array", ["I am array"], null, true, 214])

// 4

const rutina = [
    'Kelimasis',
    'Manksta',
    'Pusryciai',
    'Darbas',
    'Poilsis',
    'Miegas',
];

// console.log(rutina);
rutina.splice(4, 0, 'Pietus', 'Dar biskeli Darbas');
// console.log(rutina);
rutina.splice(1, 1);
// console.log(rutina);
removeTwo = (strings) => {
        //    console.log(strings);
        return strings.splice(0, strings.length - 2);
    }
    // console.log(removeTwo(['Kelimasis', 'Manksta', 'Pusryciai', 'Darbas', 'Poilsis', 'Miegas']));
    // console.log(removeTwo(['Kelimasis']));

// 5
task5 = () => {
        const fruits = ["Banana", "Orange", "Apple", "Mango"];
        const fruitsBasket = fruits.slice();
        fruits.push("blueberies");
        console.log(fruits);
        console.log(fruitsBasket);
        const newFruit = fruits.slice(1, 3);
        console.log(newFruit);

        const capitalCasedFruits = fruits.map(string => string.charAt(0).toUpperCase() + string.slice(1));
        capitalCasedFruits.sort();
        console.log(capitalCasedFruits);
        capitalCasedFruits.sort((a, b) => (a < b) ? 1 : -1);
        console.log(capitalCasedFruits);
    }
    // task5();

// 6

const cities = [
    'New Haven', 'Costa Mesa', 'Fremont', 'Irvine', 'Macon', 'Cambridge', 'Pueblo', 'Kailua', 'Chula Vista', 'Cathedral City', 'Modesto', 'Montgomery', 'Elkhart', 'Fairfield', 'Frederick', 'Jacksonville', 'Pensacola', 'North Port', 'Muskegon', 'Lakeland', 'Cape Coral', 'Hickory', 'Reno', 'Norfolk', 'Hesperia', 'Fort Walton Beach', 'Independence', 'Concord', 'Port Orange', 'Portsmouth', 'Escondido', 'Appleton', 'Downey', 'Clarksville', 'Ontario', 'Mesa', 'Philadelphia', 'Lubbock', 'Provo', 'Roseville', 'New Orleans', 'Lewisville', 'Nashua', 'Hayward', 'Dayton', 'McAllen', 'Fort Smith', 'Athens', 'Havre de Grace', 'Boston', 'Redding', 'Salt Lake City', 'Newburgh', 'Little Rock', 'New London', 'Bonita Springs', 'Amarillo', 'Greenville', 'Fresno', 'Billings', 'Orlando', 'Kissimmee', 'Las Cruces', 'Anaheim', 'McHenry', 'Fontana', 'Odessa', 'Memphis', 'Ann Arbor', 'Poughkeepsie', 'Hemet', 'Danbury', 'Lakewood'
];

const sortedCities = cities
    .slice()
    .sort((a, b) => (a.slice(-1) < b.slice(-1)) ? -1 : 1)
    .map(string => string.split('').reverse().join(""))

// console.log(sortedCities);

const firstLetter = cities
    .slice()
    .map(string => string.charAt(0).toLowerCase());

// console.log(firstLetter);

const filterCities = cities
    .slice()
    .filter(string => string.charAt(0) === "A");

// console.log(filterCities);

const result = (cities.slice().includes('Fremont')) ? 'Toks miestas yra' : 'Tokio miesto nera';

console.log(result);