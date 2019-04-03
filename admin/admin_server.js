'use strict';
const log = console.log;

const express = require('express')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser') // middleware for parsing HTTP body from client
const session = require('express-session')
const hbs = require('hbs')
const app = express();
app.use(bodyParser.json());

const { ObjectID } = require('mongodb')

// Import our mongoose connection
const { mongoose } = require('../db/mongoose');

// Import the models
const { Post } = require('../model/post')
const { User } = require('../model/user')
const { Admin } = require('../model/admin')

app.use(express.static("public"));

app.get('/admin', (req, res) => {

})

app.get('/admin_profile', (req, res) => {
	res.sendFile(__dirname + '/public/admin_profile_users.html')
})

app.get('/admin_profile2', (req, res) => {
	res.sendFile(__dirname + '/public/admin_profile_posts.html')
})



app.get('/admin/change_email', (req, res) => {

})

app.get('/admin/change_password', (req, res) => {

})

app.get('/admin/logout', (req, res) => {

})


app.post('/users', (req, res) => {
	// Add code here
	const user =  new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        posts: req.body.posts,
        reported:req.body.reported
	})

    user.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
})

//Get all users
app.get('/users', (req, res) => {
	log('I have reached here')
	User.find().then((users) => {
		res.send({ users}) // put in object in case we want to add other properties
	}, (error) => {
		res.status(500).send(error)
	})
	

})

//Delete a user
app.delete('/users/:id', (req, res) => {
	const id = req.params.id

	// Good practise is to validate the id
	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	// Otheriwse, findByIdAndRemove
	User.findByIdAndRemove(id).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			res.send({ user })
		}
	}).catch((error) => {
		res.status(400).send(error)
	})
	

})
	
//Make a post
app.post('/posts', (req, res) => {
	const post =  new Post ({
		   likes: req.body.likes,
       reported: req.body.reported,
       replies: req.body.replies,
       poster: req.body.poster,
       postContent: req.body.postContent,
       category: req.body.category
	})

    post.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
})

//Get all posts
app.get('/posts', (req, res) => {
	log('I have reached here')
	Post.find().then((posts) => {
		res.send({ posts}) 
	}, (error) => {
		res.status(500).send(error)
	})
})

//Make reply to a post
app.post('/posts/:id', (req, res) => {

  const id = req.params.id

	const post =  new Post ({
		likes: req.body.likes,
		reported: req.body.reported,
		replies: req.body.replies,
		poster: req.body.poster,
		postContent: req.body.postContent,
		category: req.body.category
})


	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}


	Post.findOneAndUpdate({_id: req.params.id}, {
		$push: {replies: post}
	},{new: true}).then((reply) => {
		if (!reply) {
		    res.status(404).send()
		} else {

			
			
			res.send(reply)
		}
	    }).catch((error) => {
		    res.status(400).send(error)
	    })
})

//Delete a post and all its replies
 app.delete('/posts/:id', (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}


	// Otheriwse, findByIdAndRemove
	Post.findByIdAndRemove(id).then((post) => {
		if (!post) {
			res.status(404).send()
		} else {
			const replies = post.replies

			replies.map(reply => {
			Post.deleteOne( {"_id" : reply._id}).then((post) => {
					if (!post) {
						res.status(404).send()
					} else {
						res.send({ post })
			    }
			})
		})
			res.send({ post })
	}
	}).catch((error) => {
		res.status(400).send(error)
	})
	

})

app.listen(port, () => {
	log(`Listening on port ${port}...`)
});


