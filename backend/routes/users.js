const express = require('express');
const isAuth = require('../middleware/isAuth');
const userController = require('../controllers/users');

const router = express.Router();

router.get('/', isAuth, userController.index);

router.delete('/:id', isAuth, userController.destroy);

module.exports = router;
