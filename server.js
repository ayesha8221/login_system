if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = 3001
const con = require('./db')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initialisePassport = require('./passport-config')
initialisePassport(
  passport,
  username => con.find(con => con.username === username)
   )


var fs = require("fs");

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret : process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.render('index.ejs', { name: "Ms Galant"})
})

//login
app.get('/login', (req, res) => {
    res.render('login.ejs')
}) 

app.post('/login', passport.authenticate('local', {
  successRedirect : '/',
  failureRedirect: '/login',
  failureFlash :true
}))

//register
app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', (req, res) => {
  try {
    const hashedPassword = bcrypt.hash(req.body.password, 10)
    const userData = {
      fullname: req.body.fullname,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword
  };

  const sql = 'INSERT INTO Users SET ?';
  con.query(sql, userData, (err, result) => {
      if (err) {
          console.error('Database error:', err);
          res.status(500).send('Error during registration');
      } else {
          res.redirect('/login');
      }
  });
} catch (error) {
  res.redirect('/register');
  console.error('Error during registration:', error);
  res.status(500).send('Error during registration');
}
// console.log(result)
});

//     users.push({
//       fullname : req.body.fullname,
//       email : req.body.email,
//       username : req.body.username,
//       password : hashedPassword
//     })
//     res.redirect('/login')
//   } catch (error) {
//     res.redirect('/register')
//   }
//   console.log(Users)
// })

// register user

//login user

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})