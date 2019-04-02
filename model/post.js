const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    likes: Number,
    reported: Number,
    replies: [PostSchema],
    poster: UserSchema,
    postContent: String,
    category: String
});

const Post = mongoose.model('Post', PostSchema);


module.exports = { Post};