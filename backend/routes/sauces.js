let express = require('express');
let router = express.Router();

let saucesCtrl = require('../controllers/sauces');
let auth = require('../middleware/auth'); // pour appliquer le middleware a toutes les routes de l'application afin de sécuriser les requetes au serveur
let multer = require('../middleware/multer-config');

//  post pour permettre aux users de poster des objets + installer body-parser --save dans le dossier projet cd backend pour le mettre dans package.json
router.post('/', auth, multer, saucesCtrl.createSauce); // middleware auth avant controller pour proteger pas l'authenficiation

router.post('/:id/like', auth, saucesCtrl.createLikesDislikes);

router.put('/:id', auth, multer, saucesCtrl.modifSauce);

router.delete('/:id', auth, saucesCtrl.deleteSauce);

router.get('/:id', auth, saucesCtrl.getOneSauce);

router.get('/', auth, saucesCtrl.getAllSauces);
    //  FIN - récupération de la liste des sauces dans la BDD


module.exports = router;