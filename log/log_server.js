'use strict';
const log = console.log;

const express = require('express')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser') // middleware for parsing HTTP body from client
const session = require('express-session')
const hbs = require('hbs')
const app = express();
app.use(bodyParser.json());

const {ObjectID} = require('mongodb')

// Import our mongoose connection
const {mongoose} = require('../db/mongoose');

// Import the models
const {Post} = require('../model/post')
const {User} = require('../model/user')
const {Admin} = require('../model/admin')

const path = require('path');

app.use(express.static("public"));

// Add express sesssion middleware
app.use(session({
    name: 'sid',
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, //2 hours
        httpOnly: true,
        sameSite: true
    }
}))

// Add middleware to check for logged-in users
const sessionChecker = (req, res, next) => {
    if (req.session.user || req.session.admin) {
        res.redirect('dashboard')
    } else {
        next();
    }
}

// Add middleware to check for not logged-in users
const redirectToIndex = (req, res, next) => {
    if (!req.session.user && !req.session.admin) {
        res.redirect('/')
    } else {
        next();
    }
}

app.get('/', sessionChecker, (req, res) => {
    res.redirect('/index')
})

//user signup
app.post('/users', (req, res) => {
    // Add code here

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        posts: req.body.posts,
        reported: req.body.reported
        //creator: req.user._id // from the authenticate middleware

    })

    user.save().then((result) => {
        res.send(result)
    }, (error) => {
        res.status(400).send(error) // 400 for bad request
    })
})

//admin sign up
app.post('/admins', (req, res) => {
    // Add code here

    const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
        //creator: req.user._id // from the authenticate middleware
    })

    admin.save().then((result) => {
        res.send(result)
    }, (error) => {
        res.status(400).send(error) // 400 for bad request
    })
})

// route for index
app.get('/index', sessionChecker, (req, res) => {
    res.sendFile(path.join(__dirname + '/..' + '/main_sections/public/index.html'))
})

// route for sign up
app.get('/signup', sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/public/sign_up.html')
})

// route for login
app.get('/login', sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/public/sign_in.html')
})

//user admin log in
app.post('/login', sessionChecker, (req, res) => {
    const name = req.body.name
    const password = req.body.password
    log('name pswd: ' + typeof name + typeof password)

    if (!(name.toLowerCase() === 'admin')) {
        User.findByNamePassword(name, password).then((user) => {
            if (!user) {
                log('no matching user :(')
                res.redirect('/login')
            } else {
                // Add the user to the session cookie that we will
                // send to the client
                req.session.user = user._id;
                log(req.session.user)
                // req.session.name = user.name
                log('found user :)')
                res.redirect('/dashboard')
            }
        }).catch((error) => {
            log(error)
            res.status(400).send(error)
        })
    } else {
        Admin.findByNamePassword(name, password).then((admin) => {
            if (!admin) {
                log('no matching admin :(')
                res.redirect('/login')
            } else {
                // Add the user to the session cookie that we will
                // send to the client
                req.session.admin = admin._id;
                // req.session.name = admin.name
                log('found admin :)')
                res.redirect('/dashboard')
            }
        }).catch((error) => {
            log(error)
            res.status(400).send(error)
        })
    }
})


// route for dashboard
app.get('/dashboard', redirectToIndex, (req, res) => {
    log('send logged_q')
    res.sendFile(path.join(__dirname, '..', '/main_sections/public/logged_q.html'))
})

// //admin log in
// app.post('/login/admin', (req, res) => {
//     const name = req.body.name
//     const password = req.body.password
//     log('name pswd: ' + typeof name + typeof password)
//
//
// })

//comment bc it can't be compiled
// app.updateEmail('/posts/:id', (req, res) => {
//
//   var user = req.params.id;
//   User.find({email: user});
//
// })

// Middleware for authentication for resources
const authenticateUser = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.redirect('/')
        })
    } else {
        res.redirect('/')
    }
}

// Middleware for authentication for resources
const authenticateAdmin = (req, res, next) => {
    if (req.session.admin) {
        Admin.findById(req.session.admin).then((admin) => {
            if (!admin) {
                return Promise.reject()
            } else {
                req.admin = admin
                next()
            }
        }).catch((error) => {
            res.redirect('/')
        })
    } else {
        res.redirect('/')
    }
}

//user log out
app.get('/users/logout', authenticateUser, (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.clearCookie('sid')
            res.redirect('/')
        }
    })
})

//admin log out
app.get('/admins/logout', authenticateAdmin, (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.clearCookie('sid')
            res.redirect('/')
        }
    })
})

//use what's in admin_server to check authentication of admin_Server
//Get all users
app.get('/users', authenticateAdmin, (req, res) => {
    log('I have reached here')
    User.find().then((users) => {
        res.send({users}) // put in object in case we want to add other properties
    }, (error) => {
        res.status(500).send(error)
    })


})

app.listen(port, () => {
    log(`Listening on port ${port}...`)
});
