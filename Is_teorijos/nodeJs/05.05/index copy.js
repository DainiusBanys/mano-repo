import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
// express modulio iniciavimas
const app = express()
    // sugeneruojamas esamos direktorijos absoliutus kelias
const __dirname = dirname(fileURLToPath(
        import.meta.url))
    // console.log(dirname(fileURLToPath(    import.meta.url)))
app.get('/', (req, res) => {
    // req - request
    // res - response
    // res.status(404)
    // res.send('<style> body {background-color: gray;} </style> <h1>Titulinis puslapis</h1> <a href="/apie-mus">Apie mus</a>')

    res.sendFile(__dirname + '/templates/index.html')
})

app.get('/apie-mus', (req, res) => {
    // res.send('<style> body {background-color: cyan;} </style> <h1>Apie mus</h1> <a href="/">Titulinis puslapis</a>')
    res.sendFile(__dirname + '/templates/apie.html')
})

app.listen(3000)