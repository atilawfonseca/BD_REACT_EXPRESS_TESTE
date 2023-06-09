const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require('cors'); 
const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "At1l@040789",
  database: "cruddatabase",
  port: "3306",
});

db.connect();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

//aqui tu envia uma req e recebe uma resp. Nesta requisição já envia uma query ao BD. Na resposta do bd imprime na tela da pagina o resultado do bd. 
app.get("/api/get", (req, resp) => {

  const sqlSelect = "SELECT * FROM cruddatabase.movie_reviews";
  db.query(sqlSelect, (error, result) => {
    resp.send(result);
  })
})


app.post("/api/insert", (req, resp) => {

  const movieName = req.body.movieName; 
  const movieReview = req.body.movieReview;

  const sqlInsert = "INSERT INTO `cruddatabase`.`movie_reviews` (`movieName`, `movieReview`) VALUES (?, ?)";
  db.query(sqlInsert, [movieName, movieReview], (error, result) => {
    console.log(result);
  })
  
  
});

/* O NODE trabalha de forma assincrona, apesar do conection.end() estava no final, houve um erro na comunicação.*/
app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO `cruddatabase`.`movie_reviews` (`movieName`, `movieReview`) VALUES ('não fui deletado', 'primeiro passo já foi');";
  db.query(sqlInsert, (erro, result) => {
    if (erro) throw erro;
    res.send(`"tudo certo agora!`);
    
  });
});

app.delete(`/api/delete/:movieName`, (req, resp)=> {
  const name = req.params.movieName; 
  const sqlDelete = 
  "DELETE FROM `cruddatabase`.`movie_reviews` WHERE (`movieName` = ?);"

  db.query(sqlDelete, name, (erro, result) => {
    if(erro) console.log(erro);
  })
})

app.put("/api/update", (req, resp) => {
  const name = req.body.movieName; 
  const review = req.body.movieReview;

  const sqlUpdate = "UPDATE `cruddatabase`.`movie_reviews` SET `movieReview` = ? WHERE (`movieName` = ?);"

  db.query(sqlUpdate, [review, name], (erro, result) => {
    if(erro) console.log(erro);
  })
})

app.listen(port, () => {
  console.log("running on port 5000");
});




