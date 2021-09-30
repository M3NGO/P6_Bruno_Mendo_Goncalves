let mongoose = require('mongoose');

let saucesSchema = mongoose.Schema({ // saucesShema va donne la forme de l'objet crée par le user  comme définit dans app.js
    userId :{type : String, required:true},
    name: {type : String, required:true},
    manufacturer : {type : String, required:true},
    description :{type:String, required:true},
    mainPepper: {type : String, required:true},
    imageUrl :{type : String, required:true},
    heat : {type : Number, required:true},
    usersLiked :{type :Array, required:true}, //a revoir
    usersDisliked : {type :Array, required:true},//a revoir
    likes :{type :Number, default : 0,min: 0, required:true}, // default :0 to set value by default 0 
    dislikes :{type :Number, default : 0,min: 0, required:true},

});

module.exports = mongoose.model('Sauce', saucesSchema); //definit le model que mongoose va utiser pour créer l'objet dans MongoDB Sauce vient du nom du fichier et saucesSchema c'est la letante qui définit l'objet

