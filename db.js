var mysql = require('mysql');

var con = mysql.createConnection({
  host: "buvcgjlkuwdgxoj0w9vr-mysql.services.clever-cloud.com",
  user: "utdlwoc5b404dqgk",
  password: "kHr1VmvlCWFZkqAWqrw7",
  database: "buvcgjlkuwdgxoj0w9vr"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM Users", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

module.exports = con;