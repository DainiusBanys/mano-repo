// digits = () => { return }
// for (let index = 0; index <= 9; index++) {
//     console.log(index)
// }
// digits();

// square = () => { return }
// for (let index = 0; index <= 9; index++) {
//     console.log(index * index)
// }
// square();

// doubleEven = () => { return }
// for (let index = 10; index <= 99; index++) {
//     let rez = index % 2;
//     if (rez === 0)
//         console.log(index)

// }
// doubleEven();

// let max = prompt('ivesk max riba');

// function range(max) { return max }
// for (let index = 0; index <= range(max); index++) {
//     console.log(index)
// }


// luckyNumbers = (quantity) => {
//     const a = prompt('Įveskite intervalo pradžią:');
//     const b = prompt('Įveskite intervalo pabaigą:');
//   for (let index = a; index <= b; index++) {
//     let result = ((index % 6)) === 0;
//     if (result == true) { let quantity = quantity + 1}
//   }
//   console.log(quantity);
// }
// luckyNumbers();

// average = () => {
//     let height = [];
//   let treesQty = prompt('Kiek eglučių atvežta?');
//   for (let index = 1; index <= treesQty; index++) {
//     height[index] = prompt('Įveskite '+ index + ' eglutės aukštį:');
//     totalSum += height[index];

//   console.log(totalSum/treesQty);                             
//   }}
//   average();


// while cycle

// 1

saldainiai = () => {
        let viso = prompt('kiek saldainiu is viso?');
        let perskaityta = 0;
        let m = 1
        while (perskaityta < viso) {
            if ((viso - perskaityta) >= m) {
                perskaityta = perskaityta + m;
                if (perskaityta == viso) { console.log(m) };
                m++;
            } else {
                perskaityta = perskaityta + ((viso - perskaityta));
                console.log(m);
            }
        }
    }
    //    saldainiai();


// Įveskite kuro bako talpą: 20
// Įveskite kuro sąnaudas n: 5
// Keliauti bus galima 3 dienų/(as)/(ą).


travelDays = () => {
        let m = 0;
        let tank = prompt('Įveskite kuro bako talpą:');
        let consumption = prompt('Įveskite kuro sąnaudas n:');
        let remaining = tank;
        while (remaining > 0) {
            m++;
            if (m % 2 !== 0) {
                remaining = remaining - (2 * consumption);

            } else {
                remaining = remaining - consumption;

            }
        }
        console.log('Keliauti bus galima ' + m + ' dienų /(as)/(ą).')
    }
    // travelDays();

// 3

knygos = () => {
        let viso = prompt('Įveskite knygos skyrių skaičių:');
        let perskaityta = 0;
        let m = 1
        while (perskaityta < viso) {
            if ((viso - perskaityta) >= m) {
                perskaityta = perskaityta + m;
                if (perskaityta == viso) {
                    console.log('Tadas visą knygą perskaitys per ' + m + ' dienas (-ų).');
                    console.log('Tadas vidutiniškai per dieną perskaitė ' + (viso / m) + ' skyrius(-ų).')
                };
                m++;
            } else {
                perskaityta = perskaityta + ((viso - perskaityta));
                console.log('Tadas visą knygą perskaitys per ' + m + ' dienas (-ų).');
                console.log('Tadas vidutiniškai per dieną perskaitė ' + (viso / m).toFixed(2) + ' skyrius(-ų).')
            }
        }
    }
    // knygos();

// 4

calculator = () => {
        let index = 1;
        let input = [];
        let operation = prompt('Įveskite veiksmą (suma - 1, atimtis - 2, daugyba - 3, *didžiausia reikšmė sraute - 4, *mažiausia reikšmė sraute - 5):');

        while (operation !== '1' || operation !== '2' || operation !== '3' || operation !== '4' || operation !== '5') {
            let operation = prompt('Neteisinga reikšmė, Danute Tu, Danute.. Įveskite veiksmą (suma - 1, atimtis - 2, daugyba - 3, *didžiausia reikšmė sraute - 4, *mažiausia reikšmė sraute - 5):');
        }

        while (input[index - 1] !== '0') {
            input[index] = prompt('įveskite skaičių arba "0" operacijos pabaigai');

            index++;
        }


        function calculate(operation, index) {
            let result;
            let text = '';
            switch (operation) {
                case '1':
                    result = 0;
                    for (let i = 1; i < (index - 1); i++) {
                        result = result + (input[i] / 1);
                    }
                    text = 'sum: '
                    return (text + result);

                case '2':
                    result = (input[1] / 1);
                    for (let i = 2; i < (index - 1); i++) {
                        result = result - (input[i] / 1);
                    }
                    text = 'substract: '
                    return (text + result);

                case '3':
                    result = 1;
                    for (let i = 1; i < (index - 1); i++) {
                        result = result * (input[i] / 1);
                    }
                    text = 'multiply: '
                    return (text + result);

                case '4':
                    result = (input[1] / 1);
                    for (let i = 1; i < (index - 1); i++) {
                        if (result < (input[i] / 1)) {
                            result = (input[i] / 1);
                        }
                    }
                    text = 'max: '
                    return (text + result);

                case '5':
                    result = (input[1] / 1);
                    for (let i = 1; i < (index - 1); i++) {
                        if (result > (input[i] / 1)) {
                            result = (input[i] / 1);
                        }
                    }
                    text = 'min: '
                    return (text + result);


            }
        }
        let calc = calculate(operation, index);
        console.log(calc);
    }
    // calculator()

// 5 

math = () => {
        let a = Math.floor(Math.random() * 10) + 1;
        let b = Math.floor(Math.random() * 10) + 1;
        console.log(a + ' + ' + b + ' = ');
        let c = prompt(a + ' + ' + b + ' = ');
        while (a + b !== (c / 1)) { c = prompt('Bandyk dar kartą!' + a + ' + ' + b + ' = ') }
        console.log(c);
        console.log('Valio!');
    }
    // math();

// 6


eilute = () => {
        let s = prompt('Ivesti skaiciu');
        let i = s.length - 1;
        console.log('Ivesta ' + s);
        while (i >= 0) {
            console.log(s.charAt(i));
            i--;
        }
    }
    // eilute();

// 7

skaiciuSuma = () => {
        let s = prompt('Ivesti skaiciu');
        let i = s.length - 1;
        console.log('Ivesta ' + s);
        let suma = 0;
        while (i >= 0) {
            suma = suma + ((s.charAt(i) / 1));
            i--;
        }
        console.log('gauta ' + suma);
    }
    // skaiciuSuma();

// 8

skaiciuSandauga = () => {
        let s = prompt('Ivesti skaiciu');
        let i = s.length - 1;
        console.log('Ivesta ' + s);
        let suma = 1;
        while (i >= 0) {
            suma = suma * ((s.charAt(i) / 1));
            i--;
        }
        console.log('gauta: sandauga = ' + suma);
    }
    // skaiciuSandauga();

// 9

digitsNumber = () => {
        let s = prompt('Ivesti skaiciu');
        let i = s.length;
        console.log('Ivesta ' + s);
        console.log('Gauta: suma = ' + i);
    }
    // digitsNumber();

// 10

oddEven = () => {
        let s = prompt('Ivesti skaiciu');
        let i = s.length - 1;
        console.log('Ivesta ' + s);
        let digits = [];
        let odd = 0;
        let even = 0;
        while (i >= 0) {
            digits[i] = (s.charAt(i) / 1);
            if ((digits[i] % 2) === 0) { even++ } else { odd++ }
            i--;
        }
        console.log('Gauta: lyginių ' + even + ', nelyginių ' + odd + '. ');
    }
    // oddEven();