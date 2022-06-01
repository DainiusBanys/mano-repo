import express from "express";
import { faker } from '@faker-js/faker';
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

app.get('/person', (req, res) => {
    // res.sendFile(__dirname + '/templates/index.html')
    const objektas = {
        photo: faker.image.avatar(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        birthday: faker.date.past(),
        address: faker.address.city(),
        phone: faker.phone.phoneNumber()
    }
    res.json(objektas)
})


console.log('veikia jo!')

app.listen(3000);