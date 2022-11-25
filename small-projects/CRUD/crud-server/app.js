const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3003;
const cors = require('cors')
app.use(cors());


// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'task_user',
    database: 'tasks',
    password: 'task_user'
});

app.get('/list', (req, res) => {

    const sql = 'SELECT id, taskDescr as type, taskDate, taskState  FROM tasks ORDER BY taskDate';

    // simple query
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
})
app.delete('/list:taskId', (req, res) => {

    const sql = 'DELETE FROM tasks WHERE id = ?';

    // simple query
    connection.query(sql, [req.params.taskId], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})