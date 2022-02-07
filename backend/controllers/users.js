const bcrypt = require('bcryptjs');

const { setErrorCode } = require('../utils/error');
const { User } = require('../models/');

exports.index = async (req, res, next) => {
  try {
    let users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json({ users });
  } catch (err) {
    setErrorCode(err, next);
  }
};


exports.store = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User created!' });
  } catch (err) {
    setErrorCode(err, next);
  }
};

exports.update = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User created!' });
  } catch (err) {
    setErrorCode(err, next);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.destroy({where:{id}});
    let users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json({ message: 'User deleted!', users});
  } catch (err) {
    setErrorCode(err, next);
  }
};
