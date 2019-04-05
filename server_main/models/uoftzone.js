const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const PostSchema = new mongoose.Schema({
    likes: Number,
    reported: Number,
    replies: [this],
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

// // Our own student finding function
// UserSchema.statics.findByNamePassword = function(name, password) {
//     const User = this
//     console.log(typeof User)
//     console.log(User)
//
//
//     console.log('find method is called')
//     console.log(name + password)
//
//     return User.find().then((docs)=>{
//         if(!docs) {
//             return Promise.reject()
//         } else {
//             console.log({docs})
//             return Promise.resolve({docs})
//         }
//     })
//     // return User.find().then((user) => {
//     //     if (!user) {
//     //         console.log('user does not exist :(')
//     //         return Promise.reject()
//     //     }
//     //
//     //     return new Promise((resolve, reject) => {
//     //         console.log(user)
//     //         console.log('user pswd is ' + user.password)
//     //         console.log('pswd is ' + password)
//     //
//     //         if(user.password === password ){
//     //                     console.log('return the user')
//     //                     resolve(user);
//     //         } else {
//     //                     reject();
//     //                     console.log('pswd  dont match')
//     //         }
//     //         // bcrypt.compare(password, user.password, (error, result) => {
//     //         //     if (result) {
//     //         //         console.log('return the user')
//     //         //         resolve(user);
//     //         //     } else {
//     //         //         reject();
//     //         //         console.log('pswd  dont match')
//     //         //     }
//     //         // })
//     //     })
//     // })
// }

// // This function runs before saving user to database
// UserSchema.pre('save', function(next) {
//     const user = this
//
//     if (user.isModified('password')) {
//         bcrypt.genSalt(10, (error, salt) => {
//             bcrypt.hash(user.password, salt, (error, hash) => {
//                 user.password = hash
//                 next()
//             })
//         })
//     } else {
//         next();
//     }
//
// })

const User = mongoose.model('User', UserSchema);
const Admin = mongoose.model('Admin', AdminSchema);
const Post = mongoose.model('Post', PostSchema);
module.exports = { User, Admin, Post };
