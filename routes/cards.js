const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', auth, getCards);
router.delete('/:cardId', auth, deleteCard);
router.post('/', auth, createCard);
router.put('/:cardId/likes', auth, likeCard);
router.delete('/:cardId/likes', auth, dislikeCard);

module.exports = router;
