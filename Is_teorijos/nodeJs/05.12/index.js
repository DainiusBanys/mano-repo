import express from 'express'
import { engine } from 'express-handlebars'
import session from 'express-session'
import { appendFile } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import { URLSearchParams } from 'url'

const app = express()

//Handlebars sablonu prijungimo konfiguracija
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './templates')

//Sesijos priskyrimas prie express objekto
app.use(session({
    secret: 'Xc8BWMjxR5u2hyJaQ2R7UCUXAJeB4jKrXF722RXuumjZEfcD7AHuhCmEYgfCMeQ67J3Tqtumd6Nzf4ZKU9BJ3j9a4TLvFT2KmKrcaBTbdsYVWSYjXd54PRASMxfaX7Zz',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 864000000
    }
}))

//Express konfiguracijos prapletimas norint priimti POST metodu perduodamus duomenis
app.use(express.urlencoded({
    extended: false
}))

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get('/zmones/:pavarde', async(req, res) => {
    const vardai = ['egle', 'martynas', 'jonas', 'jurgis', 'rytis', 'neringa', 'mantas', 'dainius', 'jurga', 'joris']
    const pavarde = req.params.pavarde

    const zmogus = vardai[random(0, vardai.length - 1)] + ' ' + pavarde
        // res.send(zmogus)
    let masyvas = []

    const database = await readFile('duomenys.json', 'utf8')


    if (database === '') {
        masyvas.push(zmogus)
    } else {



        masyvas = JSON.parse(database)
        masyvas.push(zmogus)
    }





    let jasonString = JSON.stringify(masyvas)

    writeFile('duomenys.json', jasonString, 'utf8')
    console.log('duomenys sekmingai issaugoti database.json faile')

    res.send(`${zmogus} sėkmingai išssaugotas faile.`)
    return



    try {
        // writeFile('vardai.txt', zmogus, { 'flag': 'a' }, 'utf8')


    } catch {
        res.send("Įvyko klaida")
    }
})

app.listen(3000)