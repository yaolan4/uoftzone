const mongoose = require('mongoose');
const { Post } = require('./post')

const PostSchema = new mongoose.Schema({
    likes: Number,
    reported: Number,
    replies: [this],
    poster: String,
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



const User = mongoose.model('User', UserSchema)

module.exports = {User}