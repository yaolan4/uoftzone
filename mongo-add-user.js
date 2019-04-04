'use strict'
const log = console.log
const { MongoClient, ObjectID } = require('mongodb')
// Connect to the local mongo database
MongoClient.connect('mongodb://localhost:27017/UTZoneAPI', (error, client) => {
	if (error) {
		log("Can't connect to mongo serber")
	} else {
		log('Connected to mongo server')
	}

	const db = client.db('UTZoneAPI')

	// Create a collection and insert into it
	// (it doesn't have to exist beforehand)
	const user = {
		name: 'User',
		email: '6324upup@gmail.com',
		password: 'User',
		posts: [],
		reported: 0
	};

	let { name, email, password, posts, reported } = user;
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


































