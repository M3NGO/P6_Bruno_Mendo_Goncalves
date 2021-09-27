const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    likes :{type :Number, required:true},
    dislikes :{type :Number, required:true},
})

const usersLikeSchema = mongoose.Schema({
    usersLiked :{type :Array, required:true}, //a revoir
    usersDisliked : {type :Array, required:true},//a revoir
})


module.exports = mongoose.model('Like', likeSchema)
module.exports = mongoose.model('UsersLike', usersLikeSchema)