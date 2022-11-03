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

    res.sendFile(__dirname + '/site_templates/index.html')
})

app.get('/apie', (req, res) => {
    res.sendFile(__dirname + '/site_templates/apie.html')
})
app.get('/darbas', (req, res) => {
    res.sendFile(__dirname + '/site_templates/darbas.html')
})
app.get('/klientai', (req, res) => {
    res.sendFile(__dirname + '/site_templates/klientai.html')
})
app.get('/kontaktai', (req, res) => {
    res.sendFile(__dirname + '/site_templates/kontaktai.html')
})

app.listen(3000)