const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { login } = require('./controllers/users');
const { createUser } = require('./controllers/users');

const { NotFoundError } = require('./utils/errors/errors');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.post('/signin', login);
app.post('/signup', createUser);

app.use((req, res, next) => {
  const err = new NotFoundError('Ресурс не найден');
  next(err);
});

// тут линтер ругается, но, как я понял, четыре аргумента обязательны для обработчика ошибки
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
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
