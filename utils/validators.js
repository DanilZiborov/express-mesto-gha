const { Joi } = require('celebrate');

const usernameRule = Joi.string().min(2).max(30).default('Жак-Ив Кусто');
const userAboutRule = Joi.string().min(2).max(30).default('Исследователь');
const userAvatarRule = Joi.string().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/im).default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png');
const userEmailRule = Joi.string().required().email();
const userPasswordRule = Joi.string().required().regex(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/);

const objectIdRule = Joi.string().hex().length(24);

module.exports.userCreationValidator = {
  body: Joi.object().keys({
    name: usernameRule,
    about: userAboutRule,
    avatar: userAvatarRule,
    email: userEmailRule,
    password: userPasswordRule,
  }).unknown(true),
};

module.exports.userDataValidator = {
  body: Joi.object().keys({
    name: usernameRule,
    about: userAboutRule,
    avatar: userAvatarRule,
  }).unknown(true),
};

module.exports.cardValidator = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }).unknown(true),
};

module.exports.objectIdParamsValidator = {
  params: Joi.object().keys({
    cardId: objectIdRule,
  }),
};
