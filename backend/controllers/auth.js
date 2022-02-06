const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { setErrorCode, throwError } = require('../utils/error');
const { User } = require('../models/');

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'somesupersecretsecret', {
    expiresIn: maxAge,
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ where: { email } });
    if (!user) {
      throwError('Invalid email or password.', 422);
    }
    let doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
      const token = createToken(user.id);
      res.status(200).json({ token, userId: user.id });
    } else {
      throwError('Invalid email or password.', 422);
    }
  } catch (err) {
    setErrorCode(err, next);
  }
};

exports.postSignup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let hashedPassword = await bcrypt.hash(password, 12);
    let user = await User.create({ name, email, password: hashedPassword });
    const token = createToken(user.id);
    res.status(201).json({ message: 'User created!', userId: user.id, token });
  } catch (err) {
    setErrorCode(err, next);
  }
};

exports.postLogout = (req, res, next) => {
  req.headers.authorization = '';
  res.status(200).json();
};
