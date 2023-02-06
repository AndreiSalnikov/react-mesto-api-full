const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const ConflictError = require('../errors/ConflictError');

module.exports.getUsers = (req, res, next) => {
  User.find({}).then((users) => res.send(users))
    .catch(next);
};

module.exports.getMe = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user === null) { throw new NotFound('Пользователь с таким id не найден'); }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Некорректный id'));
      } else {
        next(err);
      }
    });
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user === null) { throw new NotFound('Пользователь с таким id не найден'); }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Некорректный id'));
      } else { next(err); }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash, // записываем хеш в базу
    }))
    .then((user) => res.send({
      _id: user._id,
      name,
      about,
      avatar,
      email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Такой пользователь уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest('Переданые некорректные данные для создания пользователя'));
      } else { next(err); }
    });
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при обновлении данных пользователя'));
      } else if (err.name === 'CastError') { next(new BadRequest('Некорректный id')); } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      // res.cookie('jwt', token, {
      //   maxAge: 3600000,
      //   httpOnly: true,
      // });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
