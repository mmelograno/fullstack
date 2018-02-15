'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
require('./user.model');
const expressJoi = require('express-joi-validator');
const logger = require('winston');

const basicValidator = require('../../lib/basicValidator');
const utils = require('../../lib/utils');

const router = express.Router();
const User = mongoose.model('User');

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *     - username
 *     - firstName
 *     - lastName
 *     - email
 *     - password
 *     - country
 *     properties:
 *       username:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       country:
 *         type: string
 *
 *   SignUp:
 *     type: object
 *     properties:
 *         success:
 *           type: boolean
 *           value: true
 *         message:
 *           type: string
 *           enum: [User created successfuly]
 *
 *   UserLogin:
 *     type: object
 *     required:
 *     - email
 *     - username
 *     - password
 *     properties:
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *   UserLogged:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       country:
 *         type: string
 *   Authenticated:
 *     type: object
 *     properties:
 *       sucess:
 *         type: boolean
 *         value: true
 *       message:
 *         type: string
 *         enum: [Enjoy your token!]
 *       token:
 *         type: string
 *       user:
 *         type: object
 *         $ref: '#/definitions/UserLogged'
 *   Error:
 *     type: object
 *     properties:
 *       sucess:
 *         type: boolean
 *         enum: [false]
 *       message:
 *         type: string
 *         enum: [Authentication failed. Wrong password.]
 *   ErrorUserNotFound:
 *     type: object
 *     properties:
 *       sucess:
 *         type: boolean
 *         enum: [false]
 *       message:
 *         type: string
 *         enum: [Authentication failed. User not found.]
 *   BadRequest:
 *     type: object
 *     properties:
 *       sucess:
 *         type: boolean
 *         enum: [false]
 *       message:
 *         type: string
 *         enum: [Validation message.]
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - signup
 *     summary: user registration
 *     description:
 *     produces:
 *     - application/json
 *     parameters:
 *     - in: body
 *       name: body
 *       required: true
 *       description: User object that needs to be added.
 *       schema:
 *         $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         schema:
 *            type: object
 *            $ref: '#/definitions/SignUp'
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           $ref: '#/definitions/BadRequest'
 * /authenticate:
 *   post:
 *     tags:
 *       - authenticate
 *     summary: set jwt token for authentication
 *     description:
 *     produces:
 *     - application/json
 *     parameters:
 *     - in: body
 *       name: body
 *       description: User object that needs to be added.
 *       required: true
 *       schema:
 *         $ref: '#/definitions/UserLogin'
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Authenticated'
 *       400:
 *         description: Bad Request
 *         schema:
 *           type: object
 *           $ref: '#/definitions/BadRequest'
 *       403:
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Error'
 *       404:
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ErrorUserNotFound'
 */

const userSchema = {
  body: {
    username: Joi.string().lowercase().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    country: Joi.string().uppercase().required(),
  },
};

router.post('/signup', expressJoi(userSchema), async (req, res, next) => {
  try {
    const existingUser = await User.findOne(
      {
        $or: [{ email: req.body.email }, { username: req.body.username }],
      })
      .exec();
    if (existingUser) throw new Error('User already exists.');

    const user = new User({
      email: req.body.email,
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      country: req.body.country,
    });

    user.password = user.generateHash(req.body.password);

    await user.save();
    basicValidator.authenticate(req, res);
  } catch (err) {
    res.status(400).send({
      success: false,
      err: err.message,
    });
  }
});

const userSchemaLogin = {
  body: Joi.object({
    email: Joi.string().lowercase(),
    username: Joi.string().lowercase(),
    password: Joi.string().required(),
  }).xor('username', 'email'),
};

router.post('/authenticate', expressJoi(userSchemaLogin), basicValidator.authenticate);

const userSchemaForgotPassword = {
  body: Joi.object({
    email: Joi.string().lowercase(),
    username: Joi.string().lowercase(),
  }).xor('username', 'email'),
};

router.post('/forgotPassword', expressJoi(userSchemaForgotPassword), async (req, res, next) => {
  try {
    const token = await utils.generateToken();
    logger.debug(`Token generated ${token}`);

    const match = req.body.email ? { email: req.body.email } : { username: req.body.username };

    const doc = {
      $set: {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000, // 1 hour
      },
    };

    const user = await User.findOneAndUpdate(match, doc, { new: true }).exec();
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Not Found',
      });
    }

    // await sendEmailRecoveringPassword(user.email, user.resetPasswordToken);

    return res.json({
      success: true,
      message: 'Reset Password Token was generated.',
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      err: err.message,
    });
  }
});

const userSchemaResetPassword = {
  body: Joi.object({
    password: Joi.string().lowercase().required(),
  }),
};

router.post('/reset/:token', expressJoi(userSchemaResetPassword), async (req, res) => {
  try {
    const user = await User.findOne(
      {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
      },
    ).exec();
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Not Found',
      });
    }

    const userModel = new User();
    user.password = userModel.generateHash(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    // await sendEmailPasswordUpdated(user.email);

    return res.json({
      success: true,
      message: 'Password has changed.',
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      err: err.message,
    });
  }
});

module.exports = router;
