const Card = require('../models/card');
const { STATUS_CODES } = require('../utils/STATUS_CODES');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла оошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const error = new Error();
      error.name = 'NotFoundError';
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Карточка с указанным id не найдена' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(STATUS_CODES.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла оошибка' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_CODES.CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_CODES.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла оошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error();
      error.name = 'NotFoundError';
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Карточка с указанным id не найдена' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(STATUS_CODES.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла оошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error();
      error.name = 'NotFoundError';
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Карточка с указанным id не найдена' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(STATUS_CODES.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};
