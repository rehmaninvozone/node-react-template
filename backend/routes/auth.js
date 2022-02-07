const express = require('express');
const authController = require('../controllers/auth');
const { registerValidator, loginValidator } = require('../requests/auth');

const router = express.Router();

router.post('/login', loginValidator(), authController.postLogin);

router.post('/signup', registerValidator(), authController.postSignup);

module.exports = router;
