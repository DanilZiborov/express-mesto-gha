const { celebrate } = require('celebrate');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardCreationValidator, cardIdValidator } = require('../utils/validators');

router.get('/', auth, getCards);
router.delete('/:cardId', celebrate(cardIdValidator), auth, deleteCard);
router.post('/', auth, celebrate(cardCreationValidator), createCard);
router.put('/:cardId/likes', auth, celebrate(cardIdValidator), likeCard);
router.delete('/:cardId/likes', auth, celebrate(cardIdValidator), dislikeCard);

module.exports = router;
