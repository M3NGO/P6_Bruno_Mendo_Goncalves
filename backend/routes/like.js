const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like')
const auth = require('../middleware/auth'); 

router.post('/:id/like', auth, likeCtrl.createLike);
router.post('/:id/like', auth, likeCtrl.deleteLike);
router.post('/:id/like', auth, likeCtrl.createDislike);
router.post('/:id/like', auth, likeCtrl.deleteDislike);

module.exports = router;