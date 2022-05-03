import readline from 'readline'

const reading = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
import chalk from 'chalk';

// let rezultatas = '';

// for (let i = 0; i < process.stdout.columns; i++) {
//     rezultatas += '*'
// }
// let n = 1
// while (n < 10) {
//     console.log(chalk.yellow(rezultatas));
//     n++;
// }
// n = 1
// while (n < 10) {
//     console.log(chalk.green(rezultatas));
//     n++;
// }

// n = 1
// while (n < 10) {
//     console.log(chalk.red(rezultatas));
//     n++;
// }

reading.question('iveskite varda ', vardas => {
    reading.question('iveskite slaptazodi ', passw => {

        (vardas !== 'Dainius' || passw !== 'password') ? console.log(chalk.red('neteisingi duomenys')): console.log(chalk.green('OK'));

        reading.close()
    })
})