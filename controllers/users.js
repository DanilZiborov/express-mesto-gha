const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
      const error = new mongoose.Error.DocumentNotFoundError();
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Пользователь c указанным id не найден' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(STATUS_CODES.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.status(STATUS_CODES.CREATED).send({ data: user }))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          res.status(STATUS_CODES.BAD_REQUEST).send({ message: 'Некорректные данные', errorMessage: err.message });
        } else res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
      }));
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new mongoose.Error.DocumentNotFoundError();
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Пользователь c указанным id не найден' });
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(STATUS_CODES.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new mongoose.Error.DocumentNotFoundError();
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Пользователь c указанным id не найден' });
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(STATUS_CODES.BAD_REQUEST).send({ message: 'Некорректные данные' });
      } else res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'top-secret-key', { expiresIn: '7d' });
      res.status(STATUS_CODES.OK).send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports.getUserInfo = (req, res) => {
  console.log('пам-пам');
  User.findById({ _id: req.user._id })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ message: 'Не удалось собрать инфу о пользователе(((' }));
};
