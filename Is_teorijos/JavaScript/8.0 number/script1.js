// 1

rand = () => {
        let rand1 = Math.round(Math.random() * 4);
        let rand2 = Math.round(Math.random() * 4);
        console.log('rand1: ' + rand1 + ' rand2: ' + rand2 + ' division result: ' +
            Math.max(rand1, rand2) / Math.min(rand1, rand2));
    }
    // rand();

// 2

rand = () => {
    let rand = [];
    let mid = [];
    for (let i = 1; i <= 3; i++) {

        rand[i] = Math.round(Math.random() * 25);
        console.log(rand[i]);

    }
    for (let i = 1; i <= 3; i++) {
        if (rand[i] > Math.min(rand[1], rand[2], rand[3]) && (rand[i] < Math.max(rand[1], rand[2], rand[3]))) { console.log('middle numer: ' + rand[i]) }
    }

}

// rand();

// 3

rand = () => {
    let rand = [];
    let mid = [];
    let b;
    for (let i = 1; i <= 3; i++) {

        rand[i] = Math.round(Math.random() * 9) + 1;
        console.log(rand[i]);
    }
    let a = Math.min(rand[1], rand[2], rand[3]);
    let c = Math.max(rand[1], rand[2], rand[3]);
    for (let y = 1; y <= 3; y++) {
        if (rand[y] >= Math.min(rand[1], rand[2], rand[3]) && (rand[y] < Math.max(rand[1], rand[2], rand[3]))) b = rand[y]
    }
    console.log('a: ' + a + ' b: ' + b + ' c: ' + c);
    ((a + b) > c) ? console.log('galima sudaryti trikampi'): console.log('negalima sudaryti trikampio');
}

// rand();

// 4

rand = () => {
        let rand = [];
        let zeroes = 0,
            ones = 0,
            twos = 0;
        for (let i = 1; i <= 4; i++) {

            rand[i] = Math.round(Math.random() * 2);
            switch (rand[i]) {
                case 2:
                    twos++;
                    break;
                case 1:
                    ones++;
                    break;
                case 0:
                    zeroes++;
                    break;

            }
        }
        console.log('values ' + rand[1] + rand[2] + rand[3] + rand[4]);

        console.log('zeroes ' + zeroes + " ones " + ones + ' twos ' + twos);



    }
    // rand();

// 5

rand = () => {
        let rand = [];
        for (let i = 1; i <= 3; i++) {

            rand[i] = Math.round(Math.random() * (-10)) + Math.round(Math.random() * 10);
            switch (true) {
                case (rand[i] < 0):
                    console.log('+' + Math.abs(rand[i]) + '+');
                    break;
                case (rand[i] > 0):
                    console.log('-' + rand[i] + '-');
                    break;
                case (rand[i] === 0):
                    console.log('*' + rand[i] + '*');
                    break;
            }
        }
        console.log('generated values: ' + rand[1] + rand[2] + rand[3]);
    }
    // rand();

// 6

candles = () => {
        let candleQty = Math.round(Math.random() * 5) + Math.round(Math.random() * 2995);
        switch (true) {
            case (candleQty >= 1000) && (candleQty <= 2000):
                console.log('Zvakiu kiekis: ' + candleQty + ' Kaina su 3% nuolaida: ' + (candleQty * 97 / 100));
                break;
            case (candleQty > 2000):
                console.log('Zvakiu kiekis: ' + candleQty + ' Kaina su 4% nuolaida: ' + (candleQty * 96 / 100));
                break;
            default:
                console.log('Zvakiu kiekis: ' + candleQty + ' Kaina be nuolaidos: ' + candleQty);
        }
    }
    // candles();

// 7

rand = () => {
    let rand = [];
    let averageSum = 0;
    let averageSum1 = 0;
    let decrease = 0;
    for (let i = 0; i <= 2; i++) {
        rand[i] = Math.round(Math.random() * 100)
        averageSum = averageSum + rand[i];
        if ((rand[i] >= 10) && (rand[i] <= 90)) {
            averageSum1 = averageSum1 + rand[i]
        } else {
            decrease++;
        };
    }
    console.log('reiksmes: ' + rand + ' vidurkis: ' + (averageSum / rand.length));
    console.log(' vidurkis be <10 ir >90 reiksmiu: ' + (averageSum1 / (rand.length - decrease)));
}

rand();