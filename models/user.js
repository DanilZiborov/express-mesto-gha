const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { UnauthorizedError } = require('../utils/errors/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/im.test(v),
      message: 'Некорректный url аватара пользователя',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,

  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
