//controllers pour stocker toute la logique métier
let Sauce = require('../models/Sauce');
let fs = require('fs'); //Systeme Filesystem de node.JS



exports.createSauce = (req, res, next) =>{
  let sauceLikes = JSON.parse(req.body.sauce)
   
    delete sauceLikes._id; // pour retirer le champs _id car c'est MongoDb qui créé cet _id
    let sauce = new Sauce({
      ...sauceLikes,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //génération adresse dynamique de l'image
    });
    console.log(sauceLikes)
    sauce.save() // sauvegarde sauce créé juste au dessus dans la BDD
      .then(() => res.status(201).json({message: 'Objet enregistré dans MongoDB'})) // renvoit un message de création au front sinon ça boucle
      .catch(error=> res.status(400).json({error})); // si c'est pas enregistré alors on a message erreur
 console.log(req.body) // pour checker apres création d'objet via page web que l'objet est bien créé en JSON dans le terminal VSCode
};

exports.modifSauce = (req, res, next) => {
  let sauceLikes = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    
  } : { ...req.body};

  Sauce.updateOne({_id: req.params.id}, {...sauceLikes, _id: req.params.id })
  .then(() => res.status(200).json({message: 'Sauce modifiée'}))
  .catch(error => res.status(400).json({error}));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id : req.params.id})
    .then(sauce => {
      let filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {//unlink pour effacer une chaine de caractères 
        Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
        .catch(error => res.status(400).json({ error }));

      }) 
    })
    .catch(error => res.status(500).json({error}));
  };

exports.getOneSauce = (req, res, next) =>{
  // récupération d'une sauce Specicifique
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  //Fin - récupération d'une sauce spécifique
};

exports.getAllSauces = (req, res, next) =>{ // /api/sauce sera l'url de notre application
  // récupération de la liste des sauces dans la BDD
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  };



exports.createLikesDislikes =(req, res, next)=>{
  let sauceLikes = req.body.like
  let userId = req.body.userId
  let idSauce = req.params.id

  if(sauceLikes === 1){
    Sauce.updateOne({_id: idSauce}, {$inc : {likes: sauceLikes, dislikes:0}, $addToSet: {usersLiked: userId},} , {multi: true})
      .then(() => res.status(200).json({message: 'Hmmm je Like!'}))
      .catch(error => res.status(400).json({error}));
    }

  else if(sauceLikes === -1){
    Sauce.updateOne({_id: idSauce}, {$inc: {dislikes: -sauceLikes, likes:0}, $addToSet: {usersDisliked:userId} } , {multi: true} )//-saucelikes pour inverser le sens du 1 renvoyé par la requete client
      .then(() => res.status(200).json({message: 'Beurk je Dislike!'}))
      .catch(error => res.status(400).json({error}));
  }

  else {
    Sauce.findOne({_id: idSauce})
      .then((document)=>{
        if(document.usersLiked.includes(userId)) {//usersLikes.includes(userId) pour cibler si le user a liké alors on enlèvera son userid et un vote en moins
          Sauce.updateOne({_id: idSauce,}, {$pull : {usersLiked :userId, }, $inc: {likes:-1,},} , {multi: true})
          .then(() => res.status(200).json({message: 'Je ne Like plus!'}))
          .catch(error => res.status(400).json({error}));
        } //FIN if O userLike ID => delete user and vote
        else{
          Sauce.updateOne({_id: idSauce,}, {$pull : {usersDisliked :userId, }, $inc: {dislikes:-1,},} , {multi: true})
          .then(() => res.status(200).json({message: 'Je ne Dislike plus!'}))
          .catch(error => res.status(400).json({error}));
        }//FIN if O ELSE = userDislike ID => delete user and vote
      })//FIN then if O includes userId
    } // FIN ELSE findone(id sauce) if O includes userId
}//FIN exports.createLikesDislikes