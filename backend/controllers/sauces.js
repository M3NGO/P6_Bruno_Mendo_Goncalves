//controllers pour stocker toute la logique métier
const Sauce = require('../models/Sauce');
const fs = require('fs'); //Systeme Filesystem de node.JS


exports.createSauce = (req, res, next) =>{
  const sauceObject = JSON.parse(req.body.sauce)
   
    delete sauceObject._id; // pour retirer le champs _id car c'est MongoDb qui créé cet _id
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //génération adresse dynamique de l'image
    });
    console.log(sauceObject)
    sauce.save() // sauvegarde sauce créé juste au dessus dans la BDD
      .then(() => res.status(201).json({message: 'Objet enregistré dans MongoDB'})) // renvoit un message de création au front sinon ça boucle
      .catch(error=> res.status(400).json({error})); // si c'est pas enregistré alors on a message erreur
 console.log(req.body) // pour checker apres création d'objet via page web que l'objet est bien créé en JSON dans le terminal VSCode
};

exports.modifSauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    
  } : { ...req.body};

  Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id })
  .then(() => res.status(200).json({message: 'Sauce modifiée'}))
  .catch(error => res.status(400).json({error}));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id : req.params.id})
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
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