'use strict'
const log = console.log
const { MongoClient, ObjectID } = require('mongodb')
// Connect to the local mongo database
const allposts = [];

MongoClient.connect('mongodb://localhost:27017/StudentAPI', { useNewUrlParser: true }, async (error, client) => {
	if (error) {
		log("Can't connect to mongo serber")
	} else {
		log('Connected to mongo server')
	}

	const db = client.db('UofTZoneAPI')
	let default_user = {};
	// find the created default user's id, and save it in a json file.
	await db.collection('User').find().toArray().then((user) => {
		 default_user =  user[0];
	}, (error) => {
		log("Can't fetch users", error)
	})
	const post1 = {
		likes: 0,
    	reported: 0,
    	replies: [],
    	poster: default_user._id,
    	postContent: "Fusce bibendum tincidunt vehicula. Nam tellus diam, vulputate sit amet venenatis nec, ultricies at metus. Integer id efficitur est, eu ornare nunc.",
    	category: "Q&A"
	};
	const post2 = {
		likes: 0,
    	reported: 0,
    	replies: [],
    	poster: default_user._id,
    	postContent: "Vivamus ac nulla tempus, egestas nunc lobortis, viverra lacus.",
    	category: "Q&A"
	};
	const post3 = {
		likes: 0,
    	reported: 0,
    	replies: [],
    	poster: default_user._id,
    	postContent: "Fusce bibendum tincidunt vehicula. Nam tellus diam, vulputate sit amet venenatis nec, ultricies at metus. Integer id efficitur est, eu ornare nunc.",
    	category: "BookExchange"
	};
	const post4 = {
		likes: 0,
    	reported: 0,
    	replies: [],
    	poster: default_user._id,
    	postContent: "Vivamus ac nulla tempus, egestas nunc lobortis, viverra lacus.",
    	category: "BookExchange"
	};
	const post5 = {
		likes: 0,
    	reported: 0,
    	replies: [],
    	poster: default_user._id,
    	postContent: "Fusce a libero ultricies, ullamcorper nisl eget, ultricies dolor.",
    	category: "BookExchange"
	};
	const post6 = {
		likes: 0,
    	reported: 0,
    	replies: [],
    	poster: default_user._id,
    	postContent: "Fusce bibendum tincidunt vehicula. Nam tellus diam, vulputate sit amet venenatis nec, ultricies at metus. Integer id efficitur est, eu ornare nunc.",
    	category: "FreeFood"
	};

	db.collection('Post').insert([
		//_id: 7,
		{likes: post1.likes, reported: post1.reported, replies: post1.replies, poster: post1.poster, postContent: post1.postContent, category: post1.category},
		{likes: post2.likes, reported: post2.reported, replies: post2.replies, poster: post2.poster, postContent: post2.postContent, category: post2.category},
		{likes: post3.likes, reported: post3.reported, replies: post3.replies, poster: post3.poster, postContent: post3.postContent, category: post3.category},
		{likes: post4.likes, reported: post4.reported, replies: post4.replies, poster: post4.poster, postContent: post4.postContent, category: post4.category},
		{likes: post5.likes, reported: post5.reported, replies: post5.replies, poster: post5.poster, postContent: post5.postContent, category: post5.category},
		{likes: post6.likes, reported: post6.reported, replies: post6.replies, poster: post6.poster, postContent: post6.postContent, category: post6.category}
	], (error, result) => {
		if (error) {
			log("Can't insert User", error)
		} else {
			log(result.ops) // ops has the documents added
			log(result.ops[0]._id.getTimestamp())
		}
	})
client.close()
})