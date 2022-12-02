const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3003;
// const cors = require('cors')
// app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('OK!!!OK')
})


//create the connection to database
const connection = mysql.createConnection({
    host: 'eu-cdbr-west-03.cleardb.net',
    user: 'becb3c7157d5d9',
    database: 'heroku_a54fbb9376cebde',
    password: '8217c68c'
});

//mysql://becb3c7157d5d9:8217c68c@eu-cdbr-west-03.cleardb.net/heroku_a54fbb9376cebde?reconnect=true

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
        res.send({ msg: ["info", "Task Deleted"] });
    });
})

app.post('/list', (req, res) => {

    const sql = 'INSERT INTO tasks (taskDescr, taskDate, taskState) VALUES(?,?,?)';

    // simple query
    connection.query(sql, [req.body.type, req.body.taskDate, req.body.taskState], (err, results) => {
        if (err) throw err;
        res.send({ msg: ["success", "Task Added To The List"] });
    });
})
app.put('/list:taskId', (req, res) => {

    const sql = 'UPDATE tasks SET taskDescr = ?, taskDate = ?, taskState = ? WHERE id = ?';

    // simple query
    connection.query(sql, [req.body.type, req.body.taskDate, req.body.taskState, req.params.taskId], (err, results) => {
        if (err) throw err;
        res.send({ msg: ["success", "Task Updated"] });
    });
})



app.listen(process.env.PORT || PORT);