const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    likes: Number,
    reported: Number,
    replies: [PostSchema],
    poster: UserSchema,
    postContent: String,
    category: String
});s

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    posts: [PostSchema],
    reported:Number
});

const User = mongoose.model('User', UserSchema)

module.exports = {User}