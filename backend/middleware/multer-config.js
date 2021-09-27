// ne pas oublier de npm install --save multer
const multer = require('multer');

const MIME_TYPE = { // mimetype donne la définition des formats acceptés pouir les fichiers téléchargés
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/jpg': 'jpg',
}

// const storage donne le format du fichier
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images') //destination d'enregistrement et localisation des images
    },
    filename : (req, file, callback) => {
        const name = file.originalname.split(' ').join('_') // dans le cas de fichiers només avec espace alors les espaces seront remplacés par des '_'
        const extension = MIME_TYPE[file.mimetype];
        callback(null, name + Date.now() + '.' + extension); //enregistre le fichier avec le nom + time stamp . extension
    }
});

module.exports = multer({storage}).single('image');