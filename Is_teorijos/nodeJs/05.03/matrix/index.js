import chalk from 'chalk';

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
const matrix = () => {

    const string = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';


    let rezultatas = '';

    for (let i = 0; i < process.stdout.columns; i++) {
        if (i % random(1, 12) == 0) {
            rezultatas += ' '
        } else {
            rezultatas += string[random(0, 93)]
        }
    }

    console.log(chalk.greenBright(rezultatas));

    setTimeout(matrix, 100)

}

matrix()