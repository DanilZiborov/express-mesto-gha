const router = require('express').Router();
const { celebrate } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getUserInfo,
} = require('../controllers/users');
const { userIdParamsValidator, userDataValidator } = require('../utils/validators');

router.get('/', auth, getUsers);
router.get('/me', auth, getUserInfo);
router.get('/:userId', celebrate(userIdParamsValidator), auth, getUserById);
router.patch('/me', celebrate(userDataValidator), auth, updateUserInfo);
router.patch('/me/avatar', celebrate(userDataValidator), auth, updateUserAvatar);

module.exports = router;
