'use strict';

const mongoose = require('mongoose');
const logger = require('winston');
require('./user.model');

const User = mongoose.model('User');

const UserController = {};

/**
 * updatePseudocode() updates pseudocode to mongoDb
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @return {Object} pseudocode
 */
UserController.updateUser = async (req, res, next) => {
  logger.debug('Proceeding to update user', req.auth.credentials.email);

  const doc = {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      country: req.body.country,
    },
  };

  const match = {
    _id: req.params.id,
  };

  if (req.body.password) {
    const userModel = new User();
    doc.$set.password = userModel.generateHash(req.body.password);
  }

  try {
    const user = await User.findOneAndUpdate(match, doc, { new: true }).exec();
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Not Found',
      });
    }
    logger.debug('updated');
    return res.json({
      success: true,
      message: 'Account updated',
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = UserController;
