'use strict';
const log = console.log;

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const { ObjectID } = require('mongodb')

// Mongoose
const { mongoose } = require('./db/mongoose');
const { User, Admin, Post } = require('./models/uoftzone')

// Express
const port = process.env.PORT || 3000
const app = express();

// route for root; redirect to login
app.get('/', (req, res) => {
    res.redirect('login')
})

// route for login
app.route('/login')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '..', '/log/sign_in.html'))
    })

app.post('/users/login', (req, res) => {
    const name = req.body.name
    const password = req.body.password

    User.findByEmailPassword(name, password).then((user) => {
        if(!user) {
            res.redirect('/login')
        } else {
            // Add the user to the session cookie that we will
            // send to the client
            req.session.user = user._id;
            req.session.email = user.email
            res.redirect('/dashboard')
        }
    }).catch((error) => {
        res.status(400).redirect('/login')
    })
})

// route for dashboard
app.route('/login')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '..', '/log/sign_in.html'))
    })















//////////

app.listen(port, () => {
	log(`Listening on port ${port}...`)
});

