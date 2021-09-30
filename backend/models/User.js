let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let userSchema = mongoose.Schema({
    email : {type : String, required:true, unique:true}, // unique:true  + validateur mongoose pour empecher des users de créer deux profils avec une meme boite mail
    password : {type : String, required:true},

});

userSchema.plugin(uniqueValidator);//appelle le  plugin uniqueValidator au Schema User
// ne pas oublier de mettre 'npm install --save mongoose-unique-validator' dans le terminal
module.exports = mongoose.model('User',userSchema);