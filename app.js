const express = require('express');
const mongoose = require('mongoose');
const { celebrate, errors } = require('celebrate');

const { login } = require('./controllers/users');
const { createUser } = require('./controllers/users');

const { NotFoundError } = require('./utils/errors/errors');

const { userAuthValidator } = require('./utils/validators');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.post('/signin', celebrate(userAuthValidator), login);
app.post('/signup', celebrate(userAuthValidator), createUser);

app.use((req, res, next) => {
  const err = new NotFoundError('Ресурс не найден');
  next(err);
});

app.use(errors());

// тут линтер ругается, но, как я понял, четыре аргумента обязательны для обработчика ошибки
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // console.log(err);
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
