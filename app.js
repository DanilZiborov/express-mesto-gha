const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { STATUS_CODES } = require('./utils/STATUS_CODES');

const { login } = require('./controllers/users');
const { createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.post('/signin', login);
app.post('/signup', createUser);

app.use((req, res) => {
  res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
