const mongoose = require('mongoose');


// Reservations will be embedded in the Restaurant model
const PostSchema = new mongoose.Schema({
    likes: Number,
    reported: Number,
    replies: [PostSchema],
    poster: UserSchema,
    postContent: String,
    category: String
});

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    posts: [PostSchema],
    reported:Number
});

const AdminSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
});

const Post = mongoose.model('Post', PostSchema);
const User = mongoose.model('User', UserSchema);
const Admin = mongoose.model('Admin', AdminSchema);

module.exports = { Post,User,Admin };
