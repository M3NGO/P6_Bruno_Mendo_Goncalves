const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema({ // saucesShema va donne la forme de l'objet crée par le user  comme définit dans app.js
    userId :{type : String, required:true},
    name: {type : String, required:true},
    manufacturer : {type : String, required:true},
    description :{type:String, required:true},
    mainPepper: {type : String, required:true},
    imageUrl :{type : String, required:true},
    heat : {type : Number, required:true},
});

module.exports = mongoose.model('Sauce', saucesSchema); //definit le model que mongoose va utiser pour créer l'objet dans MongoDB Sauce vient du nom du fichier et saucesSchema c'est la constante qui définit l'objet