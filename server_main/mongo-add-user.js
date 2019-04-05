'use strict'
const log = console.log
const {MongoClient, ObjectID} = require('mongodb')
const bcrypt = require('bcryptjs')

// Connect to the local mongo database
MongoClient.connect('mongodb://localhost:27017/UTZoneAPI', (error, client) => {
    if (error) {
        log("Can't connect to mongo serber")
    } else {
        log('Connected to mongo server')
    }

    const db = client.db('UoZoneAPI')

    // Create a collection and insert into it
    // (it doesn't have to exist beforehand)
    const user = {
        name: 'User',
        email: '6324upup@gmail.com',
        password: 'User',
        posts: [],
        reported: 0
    };

    // bcrypt.genSalt(10, (error, salt) => {
    //     bcrypt.hash(user.password, salt, (error, hash) => {
    //         log('hash is ' + hash)
    //         user.password = hash
    //         log('new pswd hash is ' + user.password)
    //     })
    // })

    let {name, email, password, posts, reported} = user;
    log('pswd now is ' + password)
    db.collection('User').insertOne({
        //_id: 7,
        // name: user.name, email: user.email, password: user.password, posts: user.posts, reported: user.reported
        name, email, password, posts, reported
    }, (error, result) => {
        if (error) {
            log("Can't insert User", error)
        } else {
            log(result.ops) // ops has the documents added
            log(result.ops[0]._id.getTimestamp())
        }
    })

    // close the connect
    client.close()
})


































