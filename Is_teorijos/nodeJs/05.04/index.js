import { Console } from 'console';
import { read } from 'fs'
import { readFile, appendFile, writeFile } from 'fs/promises'



// console.log(hello)

// informacijos talpinimas jsopn faile

// JSON.parse() - stringo konvertavimas i objekta
// JSON.stringify() - objekto konvertavimas i JSON stringa

// let masyvas = []

// const objektas = {
//     vardas: 'Dainius',
//     pavarde: 'Banys',
//     adresas: 'Avizieniai',
//     telefonas: '322223322223'
// }


// try {
//     const database = await readFile(database.json, 'utf8')

//     console.log(database)

//     if (database === '') {
//         masyvas.push(objektas)
//     } else {
//         masyvas = JSON.parse(database)
//         masyvas.push(objektas)
//     }

//     let jasonString = JSON.stringify(masyvas)

//     await writeFile(database.json, jasonString, 'utf8')
//     console.log('duomenys sekmingai issaugoti database.json faile')

// } catch {
//     console.log('duomenu issaugoti nepavyko')
// }

const masyvoIrasymas = async(failas) => {
    try {

        const random = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        let masyvas = []
        for (let i = 0; i < 99; i++) {
            masyvas[i] = random(1, 49)
        }

        try {

            let jasonString = JSON.stringify(masyvas)

            await writeFile(failas, jasonString, 'utf8')
            console.log('duomenys sekmingai issaugoti database.json faile')

        } catch {
            console.log('duomenu issaugoti nepavyko')
        }

        const database = await readFile(failas, 'utf8')
        let databaseStr = JSON.parse(database)


        var unique = databaseStr.filter((v, i, a) => a.indexOf(v) === i);

        const points = [40, 100, 1, 5, 25, 10];


        let uniqueSorted = unique.sort(function(a, b) { return a - b });
        console.log(unique)
        console.log(uniqueSorted)

        try {

            let jasonString1 = JSON.stringify(uniqueSorted)

            await writeFile(failas, jasonString1, 'utf8')
            console.log('duomenys sekmingai issaugoti database.json faile')

        } catch {
            console.log('duomenu issaugoti nepavyko')
        }
    } catch { return false }
    return true
}

masyvoIrasymas('database.json').then(resp => console.log(resp))