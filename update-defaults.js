'use strict'
const log = console.log
const { MongoClient, ObjectID } = require('mongodb')
// Connect to the local mongo database
MongoClient.connect('mongodb://localhost:27017/UTZoneAPI', { useNewUrlParser: true }, async (error, client) => {
	if (error) {
		log("Can't connect to mongo server");
	} else {
		console.log('Connected to mongo server')
	}

	const db = client.db('UTZoneAPI')

	// fetch all the default posts 
	let default_posts = [];
	await db.collection('Post').find().toArray().then((allposts) => {
		default_posts = allposts;
	}, (error) => {
		log("Can't fetch posts", error)
	})

	// fetch the default user
	let default_user = {};
	await db.collection('User').find().toArray().then((user) => {
		default_user = user[0];
	}, (error) => {
		log("Can't fetch users", error)
	})
	// log(default_user, default_posts)
	db.collection('User').findOneAndUpdate({
		_id: new ObjectID(default_user._id)
	}, {
		// update operators: $set and $inc
		$set: { 
			posts: [{'_id': default_posts[0]._id, 'likes': default_posts[0].likes, 'reported': default_posts[0].reported, 'replies': default_posts[0].replies, 'poster': default_posts[0].poster, 'postContent': default_posts[0].postContent, 'category': default_posts[0].category},
					{'_id': default_posts[1]._id, 'likes': default_posts[1].likes, 'reported': default_posts[1].reported, 'replies': default_posts[1].replies, 'poster': default_posts[1].poster, 'postContent': default_posts[1].postContent, 'category': default_posts[1].category},
					{'_id': default_posts[2]._id, 'likes': default_posts[2].likes, 'reported': default_posts[2].reported, 'replies': default_posts[2].replies, 'poster': default_posts[2].poster, 'postContent': default_posts[2].postContent, 'category': default_posts[2].category},
					{'_id': default_posts[3]._id, 'likes': default_posts[3].likes, 'reported': default_posts[3].reported, 'replies': default_posts[3].replies, 'poster': default_posts[3].poster, 'postContent': default_posts[3].postContent, 'category': default_posts[3].category},
					{'_id': default_posts[4]._id, 'likes': default_posts[4].likes, 'reported': default_posts[4].reported, 'replies': default_posts[4].replies, 'poster': default_posts[4].poster, 'postContent': default_posts[4].postContent, 'category': default_posts[4].category},
					{'_id': default_posts[5]._id, 'likes': default_posts[5].likes, 'reported': default_posts[5].reported, 'replies': default_posts[5].replies, 'poster': default_posts[5].poster, 'postContent': default_posts[5].postContent, 'category': default_posts[5].category}]
		}
	}, {
		returnOriginal: false // gives us back updated arguemnt
	}).then((result) => {
		log(result)
	});

	
	
	client.close()
})