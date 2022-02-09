const bcrypt = require('bcryptjs');

const { setErrorCode } = require('../utils/error');
const { User } = require('../models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.index = async (req, res, next) => {
  try {
    const { page, perPage, q } = req.query;
    let condition = q ? { name: { [Op.like]: `%${q}%` } } : null;
    let offset = q ? 0 : (page - 1) * perPage;
    let users = await User.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${q}%` } },
          { email: { [Op.like]: `%${q}%` } },
        ],
      },
      offset,
      limit: perPage,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'ASC']],
    });
    res.status(200).json({ data: users });
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

exports.show = async (req, res, next) => {
  try {
    const id = req.params.id;
    let user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    res.status(200).json({ user });
  } catch (err) {
    setErrorCode(err, next);
  }
};

exports.update = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    const id = req.params.id;
    User.update(req.body, { where: { id } });
    res.status(201).json({ message: 'User updated!' });
  } catch (err) {
    setErrorCode(err, next);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.destroy({ where: { id } });
    let users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json({ message: 'User deleted!', users });
  } catch (err) {
    setErrorCode(err, next);
  }
};
