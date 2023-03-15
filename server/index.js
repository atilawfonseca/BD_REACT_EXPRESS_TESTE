const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 5000; 

const db = mysql.createPool({
    host: 'localhost',
    port:'3306',
    user: 'root',
    password: 'At1l@040789',
    database:'cruddatabase',

});


app.get('/', (req, res) => {
    const sqlInsert = "INSERT INTO `cruddatabase`.`movie_reviews` (`movieName`, `movieReview`) VALUES ('aprendendo mysql', 'na luta');"
    db.query(sqlInsert, (erro, result) => {
        res.send("Hello Word! parece que funciona, só que não");
    } )

    
});

app.listen(port, () => {
    console.log("running on port 5000");
});