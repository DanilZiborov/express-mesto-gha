const { celebrate } = require('celebrate');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardValidator, cardIdParamsValidator } = require('../utils/validators');

router.get('/', auth, getCards);
router.delete('/:cardId', celebrate(cardIdParamsValidator), auth, deleteCard);
router.post('/', auth, celebrate(cardValidator), createCard);
router.put('/:cardId/likes', auth, celebrate(cardIdParamsValidator), likeCard);
router.delete('/:cardId/likes', auth, celebrate(cardIdParamsValidator), dislikeCard);

module.exports = router;
