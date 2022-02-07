const { body } = require('express-validator');
const { validateRequest } = require('../utils/validateRequest');

const { throwError } = require('../utils/error');
const { User } = require('../models/');

exports.storeUserValidator = () => {
  return [
    body('name').notEmpty().withMessage('name is required').trim(),
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((email) => {
        return User.findOne({ where: { email } }).then((user) => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password must be at least 8 characters.')
      .trim(),
    body('confirmPassword')
      .notEmpty()
      .withMessage('confirm password is required.')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throwError('Passwords have to match with confirm password!', 422);
        }
        return true;
      }),
    validateRequest,
  ];
};
