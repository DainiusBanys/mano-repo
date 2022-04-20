// Object as literal
const studentAsLiteral = {
    firstName: 'Marius',
    secondName: 'Antanaitis'
}

// With constructor Function
function Student2(firstName, secondName) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.sayHello = function() {
        console.log(`Hello from: ${this.firstName}`);
    }
}

const student = new Student2('Marius', 'Antanaitis');

// Create object as class
class Student3 {
    constructor(firstName, secondName) {
        this.firstName = firstName;
        this.secondName = secondName;
    }
    sayHello() {
        console.log('Hello from: ${this.firstName}');
    }
}
// Instance
// const student2 = new Student('Marius', 'Antanaitis');

// Inheritance
class Staciakampis {
    constructor(ilgis, plotis) {
        this.ilgis = ilgis;
        this.plotis = plotis;
    }
    plotas() {
        return this.ilgis * this.plotis;
    }
    perimetras() {
        return this.ilgis * 4;
    }
}

const randomStaciakampis = new Staciakampis(5, 10);

class Kvadratas extends Staciakampis {
    constructor(krastine, spalva) {
        super(krastine, krastine);
    }
}

const randomKvadratas = new Kvadratas(4);


class Cart {
    constructor() {
        const key = 'password';
        this.validateKey = function(providedKey) {
            return providedKey === key;
        }
    }
}


const student3 = Object.freeze({
    firstNameEng: 'Monica',
    firstNameFrenc: 'Monicue',
    abilities: {
        a: 1,
        b: 2,
    },
    get getName() {
        return this.firstNameFrenc;
    }
})