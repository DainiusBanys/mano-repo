// 1

class Hero {
    constructor(name) {
        this.name = name;
        this.lifes = 100;
        this.actions = ['walk', 'jump', 'fight'];
        this.positionX = 0;
        this.positionY = 0;
        this.gold = 0;
        this.bag = [];
    }
    greetings() {
        console.log(`Greetings from hero ${this.name}.`);
    };
    greetingsTo(name) {
        (name === undefined) ? this.greetings(): console.log(`Hello dear ${name}, greetings from ${this.name}!`);
    }
    damage(damNumb) {
        return this.lifes = this.lifes - damNumb;
    }
    heal(healNumb) {
        return this.lifes = this.lifes + healNumb;
    }
    getCoordinates() {
        var coordinates = new Object();
        coordinates.x = this.positionX;
        coordinates.y = this.positionY;
        console.log(coordinates);
    }
    walk(directions, steps) {

        if ((steps < 1) || (steps > 5)) { console.log('too much steps') };
        switch (directions) {
            case "left":
                this.positionX = this.positionX - steps;
                break;
            case "right":
                this.positionX = this.positionX + steps;
                break;
            case "up":
                this.positionY = this.positionY + steps;
                break;
            case "down":
                this.positionY = this.positionY - steps;
                break;
            default:
                console.log('no such direction');
        }

    }
    status() {
        console.log(this.name, this.lifes, this.gold, this.bag);
    }
};

const hero = new Hero('Sigis');



console.log(hero.lifes, hero.name, hero.actions);
hero.greetings();
hero.greetingsTo('Dainius');
hero.greetingsTo();
hero.damage(5);
hero.damage(5);
console.log(hero.lifes);
hero.heal(10);
console.log(hero.lifes);
hero.getCoordinates();
hero.walk('right', 3);
hero.walk('up', 2);
hero.getCoordinates();
hero.walk('down', 5);
hero.walk('right', 4);
hero.getCoordinates();
hero.status();

const hero1 = new Hero('Rytis');
const hero2 = new Hero('Darius');
const hero3 = new Hero('Dima');

hero1.greetings();
hero2.greetings();
hero3.greetings();