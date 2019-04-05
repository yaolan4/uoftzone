'use strict';
const log = console.log;

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const { ObjectID } = require('mongodb')

// Mongoose
const { mongoose } = require('./db/mongoose');
const { User } = require('./models/uoftzone')

// Express
const port = process.env.PORT || 3000
const app = express();
// body-parser middleware setup.  Will parse the JSON and convert to object
app.use(bodyParser.json());
// // parse incoming parameters to req.body
// app.use(bodyParser.urlencoded({ extended:true }))
//
// app.use("/", express.static(path.join(__dirname ,'.. ', '/log')))

// // Add express sesssion middleware
// app.use(session({
//     secret: 'oursecret',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 600000,
//         httpOnly: true
//     }
// }))
//
// // Add middleware to check for logged-in users
// const sessionChecker = (req, res, next) => {
//     if (req.session.user) {
//         res.redirect('dashboard')
//     } else {
//         next();
//     }
// }

// route for root; redirect to login
app.get('/', (req, res) => {
    res.redirect('login')
})

// route for login
app.route('/login')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '..', '/log/sign_in.html'))
    })

app.post('/login/user', (req, res) => {
    const name = req.body.name
    const password = req.body.password
    log('name pswd: ' + typeof name + typeof password)

    User.findByNamePassword(name, password).then((user) => {
        if(!user) {
            log('no matching user :(')
            res.redirect('/login')
        } else {
            // Add the user to the session cookie that we will
            // send to the client
            // req.session.user = user._id;
            // req.session.email = user.email
            log('found user :)')
            res.redirect('/dashboard')
        }
    }).catch((error) => {
        log(error)
        res.status(400).send()
    })
})

// route for dashboard
app.route('/dashboard')
    .get((req, res) => {
        log('send logged_q')
        res.sendFile(path.join(__dirname, '..', '/main_sections/logged_q.html'))
    })















//////////

app.listen(port, () => {
	log(`Listening on port ${port}...`)
});

