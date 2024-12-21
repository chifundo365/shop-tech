import express from 'express';
import mysql from 'mysql2';

const app = express();


app.get('/', (req, res) => {
    res.status(200).send("Hello there");
});

app.get('/cities', (req, res) => {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'world'
    });

    con.connect((err) => {
        if (err) throw err;
        console.log("Database Connected");

        const sql = "SELECT * FROM cities LIMIT 10";

        con.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);             
        })
    })
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
