// 1

jungtSk = (power) => {
    console.log(Math.pow(2, power))
}

// jungtSk(1);
// jungtSk(3);
// jungtSk(10);

// 2

kelMetai = (year) => {
    result = (year % 4 === 0);
    console.log(result);
}

// kelMetai(2020);
// kelMetai(2021);
// kelMetai(1968);

// 3
root = (sk) => {

    if (sk >= 0) { console.log(Math.sqrt(sk)) } else console.log('Šaknies ištraukti negalima, nes įvestas neigiamas skaičius');

}

// root(36);
// root(13);
// root(-9);

// 4

square = (n) => {
    result = (n % 4 === 0) && (n >= 4) ? console.log('Kvadratą sudaryti galima ') : console.log('Kvadrato sudaryti negalima ');
}

// square(0);
// square(400);
// square(8);
// square(16);

// 5

suma = (k, vnt) => {
    let sum = (vnt >= 3) ? console.log((k * vnt * 0.8).toFixed(2)) : console.log((k * vnt).toFixed(2));
}

// suma(2.44, 6);
// suma(2.44, 2);

// 6

kartai = (n, m) => {
    console.log(Math.ceil(n / m));
}

// kartai(9, 4);
// kartai(8, 4);

// 7

kampas = (laipsniai) => {
        console.log(laipsniai);
        switch (true) {
            case (laipsniai < 0):
                console.log("Kampo dydis turi būti teigiamas skaičius");
                break;
            case (laipsniai === 90):
                console.log("Statusis");
                break;
            case (laipsniai === 180):
                console.log("ištiestinis");
                break;
            case (laipsniai === 360):
                console.log("Pilnutinis");
                break;
            default:
                console.log("Pavadinimo nėra");
        }
    }
    // kampas(90);
    // kampas(50);
    // kampas(-5);

// 8

triangle = (a, b, c) => {
    (a + b > c) ? console.log('Galima sudaryti trikampį'): console.log('Negalima sudaryti trikampio');
}

// triangle(3, 4, 5);
// triangle(3, 2, 5);

// 9

perimetras = () => {
        let a = prompt('Įveskite kraštinę a:');
        let b = prompt('Įveskite kraštinę b:');
        let c = prompt('Įveskite kraštinę c:');
        let perimetras = parseInt(a) + parseInt(b) + parseInt(c);
        console.log('Trikampio perimetras: ' + perimetras);
    }
    // perimetras();

// 10

kampas = () => {
        let a = prompt('Įveskite pirmą kampą:');
        let b = prompt('Įveskite antrą kampą:');
        let c = 180 - parseInt(a) - parseInt(b);
        console.log('Trikampio trečias kampas: ' + c);
    }
    // kampas();

// 11

savaites = (dienos) => {
    console.log(dienos + ' dienų ' + Math.floor(dienos / 7) + ' savaitės ');
}

// savaites(15);
// savaites(10);
// savaites(45);

// 12

saldainiai = () => {
    let n = prompt('kiek devintoku');
    let m = prompt('kiek saldainiu');
    let s = Math.floor(m / n);
    console.log('kiekvienas gavo po ' + s);
    console.log('mokytojai liko ' + (m - (s * n)));
}

// saldainiai();

// 13

graza = () => {
    let ct = prompt('centai');
    let eg = Math.floor(ct / 100);
    let ctg = ct - (eg * 100);
    console.log(ct + ' ct ');
    console.log(eg + ' eur ir ' + ctg + ' ct ');
}

// graza();

// 14

trukme = () => {
        let h = prompt('valandos');
        let min = prompt('minutes');
        let truk = prompt('trukme minutemis');
        let mins = (parseInt(h) * 60 + parseInt(min) + parseInt(truk));
        let h1 = Math.floor(mins / 60);
        let min1 = mins - (h1 * 60);
        console.log(' h = ' + h + ' min = ' + min + ' truk = ' + truk);
        console.log(' h1 = ' + h1 + ' min1 = ' + min1);
    }
    // trukme();

// 15

filmoTrukme = () => {
        let h = prompt(' filmo pradzia: valandos');
        let min = prompt(' filmo pradzia: minutes');
        let trukmeH = prompt(' filmo trukme: valandos');
        let trukmeMin = prompt('filmo trukme: minutes')
        let truk = 30 + parseInt(trukmeH * 60) + parseInt(trukmeMin);
        let mins = (parseInt(h) * 60 + parseInt(min) + parseInt(truk));
        let h1 = Math.floor(mins / 60);
        let min1 = mins - (h1 * 60);
        console.log(' Filmo pradzia ' + h + ':' + min + ' trukme ' + trukmeH + ':' + trukmeMin);
        console.log(' Filmas pasibaigs ' + h1 + ':' + min1);
    }
    // filmoTrukme();

// 16

laikrodis = () => {
        let h = parseInt(prompt('valandos'));
        let m = parseInt(prompt('minutes'));
        let s = parseInt(prompt('sekundes'));
        const trukme = parseInt(prompt('intervalas'));
        let laikas = (3600 * h) + (60 * m) + s + trukme;
        let h1 = Math.floor(laikas / 3600);
        let m1 = Math.floor((laikas - (h1 * 3600)) / 60);
        let s1 = laikas - (h1 * 3600) - (m1 * 60);
        console.log(h + ':' + m + ':' + s);
        console.log(h1 + ':' + m1 + ':' + s1);
    }
    // laikrodis();