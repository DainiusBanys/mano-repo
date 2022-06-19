app.post('/api/orders/new', async(req, res) => {
    //  console.log(req.body)

    try {
        await orders.create(req.body)
        res.status(200).end()
    } catch {
        // res.status(500).end()
        res.sendStatus(500)

    }
})