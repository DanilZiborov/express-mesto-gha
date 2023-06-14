const express = require('express');
const mongoose = require('mongoose');
const { STATUS_CODES } = require('./utils/STATUS_CODES');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = { _id: '648883428ac9940096219611' };
  console.log(mongoose.Error);

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res.status(STATUS_CODES.NOT_FOUND).send({ message: 'Ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
