const express = require('express');
const app = express();
const port = 3003;
const cors = require("cors");
app.use(cors());
app.use(express.json());

const mysql = require("mysql2");
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Atata3388",
    database: "zoo2",
    port: 3306,
});


app.get('/list', (req, res) => {

    let sql;

    if (!req.query.sort) {
        sql = `
        SELECT
        id, animal AS type, weight
        FROM animals
        ORDER BY id DESC
      `;
    } else if (req.query.sort == 'az') {
        sql = `
        SELECT
        id, animal AS type, weight
        FROM animals
        ORDER BY animal
      `;
    } else if (req.query.sort == 'za') {
        sql = `
        SELECT
        id, animal AS type, weight
        FROM animals
        ORDER BY animal DESC
      `;
    } else if (req.query.sort == '09') {
        sql = `
        SELECT
        id, animal AS type, weight
        FROM animals
        ORDER BY weight
      `;
    } else if (req.query.sort == '90') {
        sql = `
        SELECT
        id, animal AS type, weight
        FROM animals
        ORDER BY weight DESC
      `;
    }
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.delete('/list/:animalId', (req, res) => {
    const sql = `
    DELETE FROM animals
    WHERE id = ?
  `;
    con.query(sql, [req.params.animalId], (err, result) => {
        if (err) throw err;
        res.send({ msg: ['info', 'Animal was deleted from the list.'] });
    });
});

app.post('/list/', (req, res) => {
    const sql = `
    INSERT INTO animals
    (animal, weight)
    VALUES(?, ?)
  `;
    con.query(sql, [req.body.type, req.body.weight], (err, result) => {
        if (err) throw err;
        res.send({ msg: ['success', 'New animal was added to the list.'] });
    });
});

app.put('/list/:animalId', (req, res) => {
    const sql = `
    UPDATE animals
    SET animal = ?, weight = ?
    WHERE id = ?
  `;
    con.query(sql, [req.body.type, req.body.weight, req.params.animalId], (err, result) => {
        if (err) throw err;
        res.send({ msg: ['success', 'Animal was edited.'] });
    });
});



app.listen(port, () => {
    console.log(`Server on ${port} port`)
})