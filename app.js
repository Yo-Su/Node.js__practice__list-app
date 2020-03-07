const express = require("express"); //Express読込
const app = express(); //Express準備用
const mysql = require("mysql"); //MySQL用

app.use(express.static("public")); //publicフォルダ読込
app.use(express.urlencoded({ extended: false })); //formの値を受け取る

// MySQL接続用
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_express_db" //DB作成してから接続先を記述する
});

// MySQL接続
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
  connection.query("SELECT * FROM cats", (error, results) => {
    res.render("index.ejs", { cats: results });
  });
});

app.post("/create", (req, res) => {
  connection.query(
    "INSERT INTO cats (name, color) VALUES (?,?)",
    [req.body.catName, req.body.catColor],
    (error, results) => {
      res.redirect("/index");
    }
  );
});

app.post("/delete/:id", (req, res) => {
  connection.query(
    "DELETE FROM cats WHERE id=?",
    [req.params.id],
    (error, results) => {
      res.redirect("/index");
    }
  );
});

// localhost:3000のサーバー起動
app.listen(3000);
