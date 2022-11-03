import express from 'express'
import { engine } from 'express-handlebars';
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const app = express()

const __dirname = dirname(fileURLToPath(
    import.meta.url))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.set('views', './templates');


app.get('/', (req, res) => {
    res.render('index')
    const kodas = req.query.kodas;
    const kodas1 = req.query.kodas1;
    const kodas2 = req.query.kodas2;
    console.log(kodas, kodas1, kodas2);
    if (kodas === '4' && kodas1 == '8' && kodas2 == '3')
        res.sendFile(__dirname + '/templates/indeksas.html');

    else res.sendFile(__dirname + '/templates/indeksas1.html');

})

app.get('/about', (req, res) => {
    let x = 10;
    let array = [10, 20, 30]
    let object = [
        { vardas: 'Test', pavarde: "testinis" }, { vardas: 'test1', pavarde: "testo2" }
    ]
    let salis = {
        pavadinimas: 'Lietuva',
        sostine: 'Vilnius'
    }

    res.render(`about`, { x, z: true, array, object, salis })
})

app.listen(3000)