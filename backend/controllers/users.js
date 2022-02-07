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
