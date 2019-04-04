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

	const admin = {
			name: 'Admin',
			email: 'admin123@gmail.com',
			password: 'Admin'
		};
		let { name, email, password } = admin;
		db.collection('Admin').insertOne({
			//_id: 7,
			// name: user.name, email: user.email, password: user.password, posts: user.posts, reported: user.reported
			name, email, password
		}, (error, result) => {
			if (error) {
				log("Can't insert Admin", error)
			} else {
				log(result.ops) // ops has the documents added
				log(result.ops[0]._id.getTimestamp())
			}
		})
client.close()
})