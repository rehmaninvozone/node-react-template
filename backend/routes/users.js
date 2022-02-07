const express = require('express');
const isAuth = require('../middleware/isAuth');
const userController = require('../controllers/users');
const { storeUserValidator } = require('../requests/user');

const router = express.Router();

router.get('/', isAuth, userController.index);

router.post('/create', isAuth, storeUserValidator(), userController.store);

router.post('/edit:id', isAuth, userController.update);

router.delete('/:id', isAuth, userController.destroy);

module.exports = router;
