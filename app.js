const express = require("express"); //Express用
const app = express(); //Express用
const mysql = require("mysql"); //MySQL用

app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_express_db" //DB作成してから接続先を記述する
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected");

  // 初回DB作成用
  // connection.query('CREATE DATABASE node_express_db', function (err, result) {
  //   if (err) throw err;
  //   console.log('database created');
  // });

  // DB作成後のTable作成用
  // const sql =
  //   "CREATE TABLE cats (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, color VARCHAR(255) NOT NULL)";
  // connection.query(sql, function(err, result) {
  //   if (err) throw err;
  //   console.log("table created");
  // });
});

app.get("/hello", (req, res) => {
  res.render("hello.ejs");
});

app.get("/", (req, res) => {
  res.render("top.ejs");
});

app.get("/index", (req, res) => {
  connection.query(
    'SELECT * FROM cats',
    (error, results) => {
      res.render('index.ejs', {cats: results});
    }
  );
});

app.post("/create", (req, res) => {
  connection.query(
    'INSERT INTO cats (name, color) VALUEs (?,?)',
    [req.body.catName, req.body.catColor],
    (error, results) => {
      res.redirect("/index");
    }
  );
})

app.listen(3000);
