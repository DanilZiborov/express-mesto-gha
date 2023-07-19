const { Joi } = require('celebrate');

const usernameRule = Joi.string().min(2).max(30).default('Жак-Ив Кусто');
const userAboutRule = Joi.string().min(2).max(30).default('Исследователь');
const userAvatarRule = Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/im).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png');
const userEmailRule = Joi.string().required().email();
const userPasswordRule = Joi.string().min(8);

const objectIdRule = Joi.string().hex().length(24);

module.exports.userCreationValidator = {
  body: Joi.object().keys({
    name: usernameRule,
    about: userAboutRule,
    avatar: userAvatarRule,
    email: userEmailRule,
    password: userPasswordRule,
  }),
};

module.exports.userDataValidator = {
  body: Joi.object().keys({
    name: usernameRule,
    about: userAboutRule,
    avatar: userAvatarRule,
  }),
};

module.exports.cardValidator = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }).unknown(true),
};

module.exports.userIdParamsValidator = {
  params: Joi.object().keys({
    userId: objectIdRule,
  }),
};

module.exports.cardIdParamsValidator = {
  params: Joi.object().keys({
    cardId: objectIdRule,
  }),
};
