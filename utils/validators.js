const { Joi } = require('celebrate');

const objectIdSchema = Joi.string().hex().length(24);

module.exports.userCreationValidator = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    // avatar: Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/im).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    password: Joi.string().required().regex(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/),
  }).unknown(true),
};

module.exports.cardCreationValidator = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }).unknown(true),
};

module.exports.cardIdValidator = {
  params: Joi.object().keys({
    cardId: objectIdSchema,
  }),
};

module.exports.userIdValidator = {
  params: Joi.object().keys({
    userId: objectIdSchema,
  }),
};
