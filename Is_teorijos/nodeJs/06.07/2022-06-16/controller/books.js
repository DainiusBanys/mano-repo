import express from 'express'

const router = express.Router()

//Books controlleris (router)

http://localhost:3000/books/
router.get('/', (req, res) => {
    //Kodo vykdymas
    res.send('Knygos')
})

router.post('/new', (req, res) => {
    //Kodo vykdymas
})

router.put('/edit/:id', (req, res) => {
    //Kodo vykdymas
})

router.delete('/delete/:id', (req, res) => {
    //Kodo vykdymas
})

export default router