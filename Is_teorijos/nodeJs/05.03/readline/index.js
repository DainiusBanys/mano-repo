import { read } from 'fs'
import readline from 'readline'

const reading = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// reading.question('Iveskite savo varda ', (vardas) => {
//     console.log('Jusu vardas yra ' + vardas)
//     reading.close()
// })


// reading.question('IVESKITE SKAICIU NUO 1 IKI 10', digit => {

//     if (digit > 0 && digit <= 10) {
//         for (let i = 1; i <= 10; i++) {
//             console.log(`${digit} x ${i} = ${digit * i}`)
//         }
//     } else console.log('ivestas neteisingas skaicius')
//     reading.close()

// })

// reading.question('iveskite varda ', vardas => {
//     reading.question('iveskite pavarde ', pavarde => {
//         console.log(`sveiki, ${vardas} ${pavarde}`)
//     })
// })

reading.question('Iveskite kg nuo ', from => {
    reading.question('Iveskite kg iki ', upTo => {

        console.log('kg      ' + 'pound   ' + 'stone   ');
        for (let i = from; i <= upTo; i++) {
            console.log(i + '       ' + (i * 2.2).toFixed(2) + '      ' + (i * 0.15).toFixed(2))
        }

    })
    reading.close()
})