import express from "express";

import { dirname } from 'path'
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(
    import.meta.url))

const app = express();


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html')
})


app.listen(3000);