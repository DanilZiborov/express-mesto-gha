const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getUserInfo,
} = require('../controllers/users');
const { objectIdParamsValidator, userDataValidator } = require('../utils/validators');

router.get('/', auth, getUsers);
router.get('/me', auth, getUserInfo);
router.get('/:userId', auth, celebrate(objectIdParamsValidator), getUserById);
router.patch('/me', auth, celebrate(userDataValidator), updateUserInfo);
router.patch('/me/avatar', auth, celebrate(userDataValidator), updateUserAvatar);

module.exports = router;
