const mongoose = require('mongoose');
const { Post } = require('./post')
const bcrypt = require('bcryptjs')

const PostSchema = new mongoose.Schema({
    likes: Number,
    reported: Number,
    replies: [this],
    poster: String,
    postContent: String,
    category: String
},  { collection : 'Post' });

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    posts: [PostSchema],
    reported:Number
<<<<<<< HEAD
},  { collection : 'User' });
=======
});
// Our own student finding function
UserSchema.statics.findByNamePassword = function(name, password) {
    const User = this
>>>>>>> bd0c47a300282d1828b5affa48358eecf64b7435

    return User.findOne({'name': name}).then((user) => {
        if (!user) {
            console.log('user does not exist :(')
            return Promise.reject()
        }

        return new Promise((resolve, reject) => {
            console.log(user)
            console.log('user pswd is ' + user.password)
            console.log('pswd is ' + password)

            // if(user.password === password ){
            //             console.log('return the user')
            //             resolve(user);
            // } else {
            //             reject();
            //             console.log('pswd  dont match')
            // }
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    console.log('return the user')
                    resolve(user);
                } else {
                    reject();
                    console.log('pswd  dont match')
                }
            })
        })
    })
}

// This function runs before saving user to database
UserSchema.pre('save', function(next) {
    const user = this

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next();
    }

})

const User = mongoose.model('User', UserSchema)

module.exports = { User }