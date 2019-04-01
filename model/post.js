const mongoose = require('mongoose');


const AdminSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
});

const Post = mongoose.model('Post', PostSchema);


module.exports = { Post};