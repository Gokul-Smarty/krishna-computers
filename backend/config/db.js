import mysql from "mysql2";

const db = mysql.createConnection({
  host: bbuwjf57h9fwdbuydubh-mysql.services.clever-cloud.com,
  user: uoykwnj670jrywps,
  password: g8TnucxdgIklLy636RlF,
  database: bbuwjf57h9fwdbuydubh,
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed");
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;