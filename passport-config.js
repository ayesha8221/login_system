const LocalStrategy = require('passport-local').Strategy
const con = require('./db');
const bcrypt = require('bcrypt')



async function getUserByUsername(username) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Users WHERE username = ?';
        con.query(sql, [username], (err, results) => {
            if (err) {
                reject(err);
            } else {
                const user = results[0]; // Assuming username is unique
                resolve(user);
            }
        });
    });
}

// function initialise(passport, getUserByUsername) {
//     const authenticateUser = async (username, password, done) => {
//          con = getUserByUsername(username)
//         if (con == null) {
//             return done(null, false, 'No user with that email')
//         }
//         try {
//             if (await bcrypt.compare(password, con.password)) {
//                 return done(null, con)
//             } else {
//                 return done(null, false, 'Password incorrect')
//             }
//         } catch (error) {
//             return done (error)
//         }
//     }

    passport.use(new LocalStrategy({ usernameField: 'username'},
    authenticateUser))
    passport.serializeUser((con, done) => { })
    passport.deserializeUser((id, done) => { })

}

module.exports = initialise