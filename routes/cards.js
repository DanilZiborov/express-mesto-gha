const { celebrate } = require('celebrate');
const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardValidator, objectIdParamsValidator } = require('../utils/validators');

router.get('/', auth, getCards);
router.delete('/:cardId', celebrate(objectIdParamsValidator), auth, deleteCard);
router.post('/', auth, celebrate(cardValidator), createCard);
router.put('/:cardId/likes', auth, celebrate(objectIdParamsValidator), likeCard);
router.delete('/:cardId/likes', auth, celebrate(objectIdParamsValidator), dislikeCard);

module.exports = router;
