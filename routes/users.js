const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getUserInfo,
} = require('../controllers/users');
const { userIdValidator } = require('../utils/validators');

router.get('/', auth, getUsers);
router.get('/me', auth, getUserInfo);
router.get('/:userId', auth, celebrate(userIdValidator), getUserById);
router.patch('/me', auth, updateUserInfo);
router.patch('/me/avatar', auth, updateUserAvatar);

module.exports = router;
