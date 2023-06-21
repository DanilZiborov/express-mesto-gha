const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers, getUserById, updateUserInfo, updateUserAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/me', auth, getUserInfo);
router.get('/:userId', auth, getUserById);
router.patch('/me', auth, updateUserInfo);
router.patch('/me/avatar', auth, updateUserAvatar);

module.exports = router;
