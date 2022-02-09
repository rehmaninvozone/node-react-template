const express = require('express');
const isAuth = require('../middleware/isAuth');
const userController = require('../controllers/users');
const { storeUserValidator, updateUserValidator } = require('../requests/user');

const router = express.Router();

router.get('/', isAuth, userController.index);

router.post('/create', isAuth, storeUserValidator(), userController.store);

router.get('/show/:id', isAuth, userController.show);

router.put('/update/:id', isAuth, updateUserValidator(), userController.update);

router.delete('/:id', isAuth, userController.destroy);

module.exports = router;
