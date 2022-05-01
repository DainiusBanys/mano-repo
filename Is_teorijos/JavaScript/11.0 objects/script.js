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
        this.chest = ['trap', '5gold', '20gold', 'emerald', 'potion', 'sandwich', 'snake', 'spider'];
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
        // console.log(coordinates);
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
                console.log('no such direction' + directions + steps);
        }

    }
    status() {
        console.log(this.name, this.lifes, this.gold, this.bag);
    }
    openChest() {
        let item = this.chest[Math.floor(Math.random() * 8) / 1];
        // console.log(item);
        switch (item) {
            case 'trap':
                this.lifes = this.lifes - 20;
                break;
            case '5gold':
                this.gold = this.gold + 5;
                break;
            case '20gold':
                this.gold = this.gold + 20;
                break;
            case 'potion':
                this.bag.push(item);
                break;
            case 'emerald':
                this.bag.push(item);
                break;
            case 'sandwich':
                this.bag.push(item);
                break;
            case 'snake':
                this.lifes = this.lifes - 10;
                break;
            case 'spider':
                this.lifes = this.lifes - 5;
                break;
        }


    }
};

const hero = new Hero('Sigis');

let maps = [
    [10, 15],
    [0, 1],
    [-20, -5],
    [-10, -5],
    [0, 0]
];

let mapCopy = maps.slice();

// console.log(mapCopy);


play = () => {
    while (mapCopy.length > 0) {
        hero.getCoordinates();
        let coord = mapCopy.shift();
        // console.log(coord);
        totalX = coord[0];
        totalY = coord[1];
        // console.log(totalX, totalY);

        while ((totalX !== 0) || (totalY !== 0))

        {

            if (Math.abs(totalX) > 5)

            {
                if (totalX < 0) {
                    totalX = totalX + 5;
                    directions = 'left';
                } else {
                    totalX = totalX - 5;
                    directions = 'right';
                }
                steps = 5;
                // console.log("totalX " + totalX + " steps " + steps + ' directions ' + directions);
                hero.walk(directions, steps);
            } else {
                if (totalX < 0) {
                    directions = 'left';
                } else {
                    directions = 'right';
                }
                steps = Math.abs(totalX);
                totalX = 0;
                // console.log("totalX " + totalX + " steps " + steps + ' directions ' + directions);
                if (steps !== 0) { hero.walk(directions, steps); }
            }
            if (Math.abs(totalY) > 5) {
                if (totalY < 0) {
                    totalY = totalY + 5;
                    directions = 'down';
                } else {
                    totalY = totalY - 5;
                    directions = 'up'
                }
                steps = 5;
                // console.log('totalY ' + totalY + ' steps ' + steps + ' directions ' + directions);
                hero.walk(directions, steps);
            } else {
                if (totalY < 0) {
                    directions = 'down';
                } else {
                    directions = 'up'
                }
                steps = Math.abs(totalY);
                totalY = 0;
                // console.log('totalY ' + totalY + ' steps ' + steps + ' directions ' + directions);
                if (steps !== 0) {
                    hero.walk(directions, steps)
                };
            }
        }
        // console.log(coord, hero.positionX, hero.positionY);
        if ((coord[0] === hero.positionX) && (coord[1] === hero.positionY)) {
            hero.openChest();
        }
    }
    hero.status();
}

play();


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


hero.status();
hero.openChest();
hero.openChest();
hero.openChest();
hero.status();