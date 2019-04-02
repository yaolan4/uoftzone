const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    likes: Number,
    reported: Number,
    replies: [PostSchema],
    poster: String,
    postContent: String,
    category: String
});

// Reservations will be embedded in the Restaurant model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    posts: [PostSchema],
    reported: Number
});

const AdminSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
});

const User = mongoose.model('User', UserSchema);
const Admin = mongoose.model('Admin', AdminSchema);
const Post = mongoose.model('Post', PostSchema);
module.exports = { User, Admin, Post };
