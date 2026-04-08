const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "krishna_computers",
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed");
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;