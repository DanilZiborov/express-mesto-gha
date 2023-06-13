const User = require('../models/user');
const { STATUS_CODES } = require('../utils/STATUS_CODES');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById({ _id: req.params.userId })
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.name = 'NotFoundError';
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotFoundError' || err.name === 'CastError') {
        res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Пользователь c указанным id не найден' });
      } else res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_CODES.CREATED).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(STATUS_CODES.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user_id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error();
      error.name = 'NotFoundError';
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotFoundError' || err.name === 'CastError') {
        res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Пользователь c указанным id не найден' });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(STATUS_CODES.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error();
      error.name = 'NotFoundError';
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotFoundError' || err.name === 'CastError') {
        res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Пользователь c указанным id не найден' });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(STATUS_CODES.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};
