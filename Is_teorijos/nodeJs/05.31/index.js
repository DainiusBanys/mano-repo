import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
// import { faker } from '@faker-js/faker'
import cocktails from './models/cocktails.js'

await mongoose.connect('mongodb://localhost/cocktails')

const app = express()

const __dirname = dirname(fileURLToPath(
    import.meta.url))

app.use(cors())

//Duomenu sukurimas
// if (await PersonDetails.count() < 40) {
//     for (let i = 0; i < 40; i++) {
//         await PersonDetails.create({
//             name: faker.name.findName(),
//             address: faker.address.streetAddress(),
//             company: faker.company.companyName(),
//             image: faker.image.avatar(),
//             phone: faker.phone.phoneNumber(),
//             website: faker.internet.url()
// })
// }
// }

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html')
})

app.get('/get-cocktails', async(req, res) => {
    res.json(await cocktails.find())
})

app.get('/delete/:id', async(req, res) => {
    const id = req.params.id

    const deleted = await cocktails.deleteOne({
        _id: id
    })

    if (deleted.deletedCount > 0) {
        res.status(200).send('Įrašas sėkmingai ištrintas')
    } else {
        res.status(400).send('Ivyko klaida')
    }
})

app.listen(3000)