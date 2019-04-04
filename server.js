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


// route for dashboard
// Add middleware to check for not logged-in users
// Add middleware to check for logged-in users

// Authentication
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


app.get('/dashboard', redirectToIndex, (req, res) => {
    log('send logged_q')
    res.sendFile(path.join(__dirname, '..', '/main_sections/public/logged_q.html'))
})

app.get('/index', sessionChecker, (req, res) => {
    res.sendFile(path.join(__dirname + '/..' + '/main_sections/public/index.html'))
})

app.get('/', sessionChecker, (req, res) => {
    res.redirect('/index')
})






//Navigation for  logout 
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





//Navigation for main
app.get('/logged_q', (req, res) => {
    res.sendFile(__dirname + '/public/logged_q.html')
})

app.get('/logged_b', (req, res) => {
    res.sendFile(__dirname + '/public/logged_b.html')
})

app.get('/logged_f', (req, res) => {
    res.sendFile(__dirname + '/public/logged_f.html')
})

app.get('/admin', (req, res) => {

})


//Navigation for admin
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


app.get('/users', authenticateAdmin, (req, res) => {
    log('I have reached here')
    User.find().then((users) => {
        res.send({users}) // put in object in case we want to add other properties
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


app.patch('/liked', async (req, res) => {

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }
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

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }
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

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }
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

    if (!ObjectID.isValid(id)) {
        res.status(404).send()
    }
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
let curr_user = req.session.user
app.get('/getCurrUser', (req, res) => {
    if (req.session.user) {
        res.send(req.session.user) 
    }
    else {
        res.status(404).send()
    }
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
    await posts.find({'postContent': req.body.postContent, 'category': req.body.category}).then(post => {
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






app.listen(port, () => {
	log(`Listening on port ${port}...`)
});


