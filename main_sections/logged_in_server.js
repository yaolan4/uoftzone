'use strict';
const log = console.log;

const express = require('express')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser') // middleware for parsing HTTP body from client
const session = require('express-session')
const hbs = require('hbs')
const app = express();
const {ObjectID} = require('mongodb')
app.use(bodyParser.json());

// Import our mongoose connection
const { mongoose } = require('../db/mongoose');

// Import the models
const { Post } = require('../model/post')
const { User } = require('../model/user')
const { Admin } = require('../model/admin')

app.use(express.static("public"));

app.get('/logged_q', (req, res) => {
    res.sendFile(__dirname + '/public/logged_q.html')
})

app.get('/logged_b', (req, res) => {
    res.sendFile(__dirname + '/public/logged_b.html')
})

app.get('/logged_f', (req, res) => {
    res.sendFile(__dirname + '/public/logged_f.html')
})

let curr_user = '5ca59fca1d53716ac90243eb';
app.get('/getuser', (req, res) => {
    if (!req.body._id) {
        res.status(404).send()
    }
    else {
        curr_user = req.body._id;
        res.status(200).send()
    }
})
app.post 

app.patch('/liked', async (req, res) => {

    // if (!ObjectID.isValid(id)) {
    //     res.status(404).send()
    // }
    // find the id of the post
    let allposts = [];
    await Post.find().then((post) => {
        allposts = post
    }, (error) => {
        res.status(500).send(error)
    })
    const beingmodified = allposts.filter((post) => (post.postContent == req.body.postContent) &&
        (post.category == req.body.category))
    
    // update the post's like attribute
    Post.findOneAndUpdate({
        _id: new ObjectID(beingmodified[0]._id)
    }, {
        // update operators: $set and $inc 
        $inc: {
            likes: 1
        }
    }, {
        returnOriginal: false // gives us back updated arguemnt
    }).then((result) => {
        log(result)
    });

    // update the information in poster's post list
    User.findOneAndUpdate({
        _id: new ObjectID(beingmodified[0].poster), "posts._id": new ObjectID(beingmodified[0]._id)
    }, {
        // update operators: $set and $inc 
        $inc: { "posts.$.likes" : 1 }
    }, {
        returnOriginal: false // gives us back updated arguemnt
    }).then((result) => {
        log(result)
    });

})

app.patch('/unliked', async (req, res) => {

    // if (!ObjectID.isValid(id)) {
    //     res.status(404).send()
    // }
    // find the id of the post
    let allposts = [];
    await Post.find().then((post) => {
        allposts = post
    }, (error) => {
        res.status(500).send(error)
    })
    const beingmodified = allposts.filter((post) => (post.postContent == req.body.postContent) &&
        (post.category == req.body.category))
    
    // update the post's like attribute
    Post.findOneAndUpdate({
        _id: new ObjectID(beingmodified[0]._id)
    }, {
        // update operators: $set and $inc 
        $inc: {
            likes: -1
        }
    }, {
        returnOriginal: false // gives us back updated arguemnt
    }).then((result) => {
        log(result)
    });

    // update the information in poster's post list
    User.findOneAndUpdate({
        _id: new ObjectID(beingmodified[0].poster), "posts._id": new ObjectID(beingmodified[0]._id)
    }, {
        // update operators: $set and $inc 
        $inc: { "posts.$.likes" : -1 }
    }, {
        returnOriginal: false // gives us back updated arguemnt
    }).then((result) => {
        log(result)
    });

})

app.patch('/report', async (req, res) => {

    // if (!ObjectID.isValid(id)) {
    //     res.status(404).send()
    // }
    // find the id of the post
    let allposts = [];
    await Post.find().then((post) => {
        allposts = post
    }, (error) => {
        res.status(500).send(error)
    })
    const beingmodified = allposts.filter((post) => (post.postContent == req.body.postContent) &&
        (post.category == req.body.category))
    
    // update the post's report attribute
    Post.findOneAndUpdate({
        _id: new ObjectID(beingmodified[0]._id)
    }, {
        // update operators: $set and $inc 
        $inc: {
            reported: 1
        }
    }, {
        returnOriginal: false // gives us back updated arguemnt
    }).then((result) => {
        log(result)
    });

    // update the information in poster's post list
    User.findOneAndUpdate({
        _id: new ObjectID(beingmodified[0].poster), "posts._id": new ObjectID(beingmodified[0]._id)
    }, {
        // update operators: $set and $inc 
        $inc: { "posts.$.reported" : 1, reported: 1}
    }, {
        returnOriginal: false // gives us back updated arguemnt
    }).then((result) => {
        log(result)
    });

})


app.patch('/unreport', async (req, res) => {

    // if (!ObjectID.isValid(id)) {
    //     res.status(404).send()
    // }
    // find the id of the post
    let allposts = [];
    await Post.find().then((post) => {
        allposts = post
    }, (error) => {
        res.status(500).send(error)
    })
    const beingmodified = allposts.filter((post) => (post.postContent == req.body.postContent) &&
        (post.category == req.body.category))
    
    // update the post's report attribute
    Post.findOneAndUpdate({
        _id: new ObjectID(beingmodified[0]._id)
    }, {
        // update operators: $set and $inc 
        $inc: {
            reported: -1
        }
    }, {
        returnOriginal: false // gives us back updated arguemnt
    }).then((result) => {
        log(result)
    });

    // update the information in poster's post list
    User.findOneAndUpdate({
        _id: new ObjectID(beingmodified[0].poster), "posts._id": new ObjectID(beingmodified[0]._id)
    }, {
        // update operators: $set and $inc 
        $inc: { "posts.$.reported" : -1, reported: -1}
    }, {
        returnOriginal: false // gives us back updated arguemnt
    }).then((result) => {
        log(result)
    });

})

app.get('/getCurrUser', (req, res) => {
    User.find({_id: new ObjectID(curr_user)}).then(user => {
        if (user) {
            res.send(user[0])
        }
        else {
            res.status(404).send()
        }
    }, (error) =>  {
        log(error)
    })
})

app.post('/addPost', async (req, res) => {
    const post =  new Post ({
       likes: req.body.likes,
       reported: req.body.reported,
       replies: req.body.replies,
       poster: req.body.poster,
       postContent: req.body.postContent,
       category: req.body.category
    })
    await post.save().then((result) => {
        res.send(result)
    }, (error) => {
        res.status(400).send(error) // 400 for bad request
    })

    // update the user's post list
    let target = {}
    await Post.find({'postContent': req.body.postContent, 'category': req.body.category}).then(post => {
        if (post) {
            target = post[0];
        }
    }, (error) => {
        log(error)
    })

    User.findOneAndUpdate({
        _id: new ObjectID(curr_user)
    }, {
        // update operators: $set and $inc 
        $push: { posts: target}
    }, {
        returnOriginal: false // gives us back updated arguemnt
    }).then((result) => {
        log(result)
    });
})

app.post('/addReply', async (req, res) => {
    //1.save post to database
    const post =  new Post ({
       likes: req.body.newpost.likes,
       reported: req.body.newpost.reported,
       replies: req.body.newpost.replies,
       poster: req.body.newpost.poster,
       postContent: req.body.newpost.postContent,
       category: req.body.newpost.category
    })
    await post.save().then((result) => {
        res.send(result)
    }, (error) => {
        res.status(400).send(error) // 400 for bad request
    })

    //2.update the parent post's reply list
    let newpost = [];
    let oldpost = [];
    await Post.find({'postContent': req.body.newpost.postContent, 'category': req.body.newpost.category}).then(post => {
        if (post) {
            newpost = post;
        }
    }, (error) => {
        log(error)
    })
    await Post.findOneAndUpdate({
        'postContent': req.body.oldpost.postContent, 'category': req.body.oldpost.category
    }, {
        // update operators: $set and $inc 
        $push: {"replies": newpost[0]}
    }, {
        returnOriginal: false // gives us back updated arguemnt
    }).then((result) => {
        // log(result)
    });
    

    // 3. update the post list of the write who is replying(current logged in user)
    await User.findOneAndUpdate({
        _id: new ObjectID(curr_user)
    }, {
        // update operators: $set and $inc 
        $push: { posts: newpost[0]}
    }, {
        returnOriginal: false // gives us back updated arguemnt
    }).then((result) => {
        // log(result)
    });

    // // 4. update the post list of the author of being replied, by using the result from 2
    await Post.find({'postContent': req.body.oldpost.postContent, 'category': req.body.oldpost.category}).then(post => {
        if (post) {
            oldpost = post;
        }
    }, (error) => {
        log(error)
    })
    await User.findOneAndUpdate({
        _id: new ObjectID(oldpost[0].poster), "posts.postContent": oldpost[0].postContent, "posts.category": oldpost[0].category
    }, {
        // update operators: $set and $inc 
        $push: {"posts.$.replies": newpost[0]}
    }, {
        returnOriginal: false // gives us back updated arguemnt
    }).then((result) => {
        // log(result)
    });

})
app.listen(port, () => {
    log(`Listening on port ${port}...`)
});