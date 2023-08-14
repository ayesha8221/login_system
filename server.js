const express = require('express')
const app = express()
const port = 3000

var fs = require("fs");

app.set('view-engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs', { name: "Ms Galant"})
})

//login
app.get('/login', (req, res) => {
    res.render('login.ejs')
})

// app.post()
app.post("/register", (req, res) => {
    fs.readFile(__dirname + "/" + "db.json", "utf8", function (err, data) {
      if (err) {
        console.error("Error reading the file: ", err);
        return res.status(500).send("Error reading db.json file.");
      }
  
      const users = JSON.parse(data);
      const newUser = {
        // id: ,
        "name" : req.body.name,
        "username" : req.body.username,
        "email" : req.body.email,
        "password" : req.body.password
      };
  
      users["user4"] = newUser;
  
      const updatedData = JSON.stringify(users, null, 4);
  
      fs.writeFile(__dirname + "/" + "db.json", updatedData, (err) => {
        if (err) {
          console.error("Error writing to db.json file: ", err);
          return res.status(500).send("Error writing data to file.");
        }
  
        console.log("User registered successfully!");
        res.send("User registered successfully!");
      });
    });
  });
// app.get('/register', (req, res) => {
//     res.render('register.ejs')
// })


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})