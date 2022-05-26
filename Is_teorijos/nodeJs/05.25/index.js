import express from "express";
import cors from 'cors'
import { dirname } from 'path'
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(
    import.meta.url))

const app = express();

app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html')
})

app.get('/api', (req, res) => {
    const objektas = {
        vardas: 'Dainius',
        pavarde: 'Banys'
    }
    res.json(objektas)
})

app.get('/api/weather', (req, res) => {
    let condition = ['windy', 'rain', 'sunshine']
    let location = ['London', 'Madrid', 'Vilnius', 'Berlin']
    const orai = {
        condition: condition[Math.floor(Math.random() * 3)],
        degrees: Math.floor(Math.random() * (-8)) + Math.floor(Math.random() * 40),
        location: location[Math.floor(Math.random() * 4)],
        windSpeed: Math.floor(Math.random() * 10),
        humidity: Math.floor(Math.random() * 40) + Math.floor(Math.random() * 60)
    }
    res.json(orai)
})

console.log('veikia')

app.listen(3000);