'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../app/user/user.model');

const authenticate = async (req, res) => {
  const match = req.body.email ? { email: req.body.email } : { username: req.body.username };
  const user = await User.findOne(match).exec();
  try {
    if (!user) {
      res.status(404).send({
        success: false,
        message: 'Authentication failed. User not found.',
      });
    } else if (user) {
      if (!user.validPassword(req.body.password)) {
        res.status(403).send({
          success: false,
          message: 'Authentication failed. Wrong password.',
        });
      } else {
        jwt.sign({ credentials: user }, config.secret, {
          expiresIn: 15552000, // expires in 6 months
        }, (err, token) => {
          if (err) {
            return res.status(500).send({
              success: false,
              message: 'Internal Error.',
            });
          }
          const projectedUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            country: user.country,
          };
          return res.json({
            success: true,
            message: 'Enjoy your token!',
            token,
            user: projectedUser,
          });
        });
      }
    }
  } catch (err) {
    res.json(err);
  }
};

const jwtVerify = (token, secret) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

const validation = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    try {
      const decoded = await jwtVerify(token, config.secret);
      req.auth = decoded;
      return next();
    } catch (err) {
      return res.status(403).send({
        success: false,
        message: 'Failed to authenticate token.',
      });
    }
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
};

module.exports = {
  authenticate,
  validation,
};
