const { celebrate } = require('celebrate');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardValidator, cardIdParamsValidator } = require('../utils/validators');

router.get('/', auth, getCards);
router.delete('/:cardId', celebrate(cardIdParamsValidator), auth, deleteCard);
router.post('/', celebrate(cardValidator), auth, createCard);
router.put('/:cardId/likes', celebrate(cardIdParamsValidator), auth, likeCard);
router.delete('/:cardId/likes', celebrate(cardIdParamsValidator), auth, dislikeCard);

module.exports = router;
