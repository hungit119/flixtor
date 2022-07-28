const express = require("express");
const dotenv = require("dotenv").config();
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5500;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "Tranduyhung11",
  database: "flixtor",
});

con.connect((err) => {
  if (err) {
    console.log(err);
  } else console.log("Connected !");
  global.db = con;
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM films";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ result });
  });
});

app.get("/api/search", (req, res) => {
  const q = req.query.q;
  const limit = req.query.limit;
  let sql = `SELECT * FROM films WHERE title LIKE "%${q}%" LIMIT 5`;
  if (q === "") sql = `SELECT * FROM films WHERE title LIKE "%8367863456%"`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ result });
  });
});

app.listen(PORT, () => {
  console.log("Server listening on PORT", PORT);
});
