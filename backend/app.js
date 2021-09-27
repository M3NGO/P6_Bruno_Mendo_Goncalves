const express = require('express'); //librairie de Javascript
const bodyParser = require('body-parser') // import de body-parser après l'avoir installé dans package.json on s'en sert ensuite dans app.post
// bodyparser sert rendre le body de la requete exploitable par l'app

// importer mongoose au projet pour faciliter les interactions avec mongoDB grâce a ses fonctions:

const mongoose = require('mongoose'); //mongoose pour gérer la base de donnée MongoDB

const path = require('path');
//importer le routeur du dossier router backend:
const saucesRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user')

// A voir const mongoMask = require('mongo-mask') a implementer pour securiser l'application

const app = express();

// connexion a mongoDB et mon cluster :
mongoose.connect('mongodb+srv://M3NGO:YiBkn5hFq9pRv1Y0@clusterpiiquante.nogoc.mongodb.net/BDD_PIIQUANTE?retryWrites=true&w=majority',
// mongodb+srv://M3NGO:<password>@clustercoursfullstack.xuvzw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority obtenue en cliquant sur connect du cluster créé dans mongoDB  
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//ce Middleware permet a rendre accessible notre middleware à l'application, met des headers aux réponses
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // '*' permet de donner accès a tout le monde à cet API on peut le remplacer par des URL/adressse IP pour restraindre l'accès
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next(); // ne pas oublier de le mettre pour renvoyer vers le middleware suivant
  });
  
  app.use(express.json()); // transforme l'objet de la requete en requete utilisable
  app.use(bodyParser.json()); //
  //donne le début de la route à suivre pur URL par STUFF.JS car on les a enlevées de STUFF.JS
  app.use('/images', express.static(path.join(__dirname,'images')));
  app.use('/api/sauces', saucesRoutes);
  app.use('/api/auth', userRoutes);
  
  module.exports = app;