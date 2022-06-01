import express from 'express'
import { engine } from 'express-handlebars'
import { readFile, writeFile } from 'fs/promises'

const app = express()

//Handlebars sablonu prijungimo konfiguracija
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './templates')

//Express konfiguracijos prapletimas norint priimti POST metodu perduodamus duomenis
app.use(express.urlencoded({
    extended: false
}))

//Statiniu failu perdavimo i narsykle konfiguracijos eilute
app.use('/resources', express.static('assets'))

const file = './db/database.json'

app.get('/', async(req, res) => {
    try {
        const data = await readFile(file, 'utf8')

        res.render('todolist', {
            message: req.query.message,
            status: req.query.status,
            data: JSON.parse(data)
        })
    } catch {
        res.render('todolist', {
            message: 'Nepavyko perskaityti duomenų bazės failo',
            status: 'danger'
        })
    }
})

app.get('/delete-task/:id', async(req, res) => {
    const id = req.params.id

    try {
        const data = await readFile(file, 'utf8')
        let json = JSON.parse(data)
        json.splice(id, 1)
        await writeFile(file, JSON.stringify(json), 'utf8')
        res.redirect('/?message=Užduotis sėkmingai ištrinta&status=success')
    } catch {
        res.redirect('/?message=Nepavyko ištrinti užduoties&status=danger')
    }
})


app.get('/complete-task/:id', async(req, res) => {
    const id = req.params.id

    try {
        const data = await readFile(file, 'utf8')
        let json = JSON.parse(data)

        if (json[id].hasOwnProperty('done')) {
            json[id].done = !json[id].done;
        } else {
            json[id].done = true
        }

        await writeFile(file, JSON.stringify(json), 'utf8')
        res.redirect('/?message=Užduotis sėkmingai ištrinta&status=success')
    } catch {
        res.redirect('/?message=Nepavyko ištrinti užduoties&status=danger')
    }
})

app.post('/add-task', async(req, res) => {
    const task = req.body.task
    if (!task) {
        console.log('Neuzpildytas laukelis')
        return
    }

    try {
        const db = await readFile(file, 'utf8')

        let json = JSON.parse(db)
        let today = new Date()

        json.push({
            task,
            date: today.toLocaleDateString('lt-LT')
        })

        await writeFile(file, JSON.stringify(json), 'utf8')

        res.redirect('/?message=Duomenys sėkmingai išsaugoti&status=success')
    } catch {
        res.redirect('/?message=Įvyko klaida išssaugant duomenis&status=danger')
    }

})

app.listen(3000)