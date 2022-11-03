import express from 'express'
import { engine } from 'express-handlebars';
const app = express()


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.set('views', './templates');

let returned = {}

app.get

    ('/', (req, res) => {
    // res.render('forma')
    const email = req.query.email
    const password = req.query.password

    if ((email !== undefined) && (password !== undefined) && (email === 'admin@bit.lt') && (password === 'labas1234'))

    {
        return res.redirect('/account')
    } else {
        returned.message = 'neteisingi prisijungimo duomenys'
        console.log(returned.message)
        res.render('forma', returned)
    }

})

app.get('/account', (req, res) => {
    return res.render(('account'))
})

app.get('/transfer', (req, res) => {
    const data = {
        number: req.query.account_number,
        recipient: req.query.recipient,
        reference: req.query.reference
    }
    return res.render(('transfer'))
})
app.listen(4000)