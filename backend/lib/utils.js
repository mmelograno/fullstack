'use strict';

const crypto = require('crypto');

const generateToken = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(20, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString('hex'));
      }
    });
  });

module.exports = {
  generateToken,
};
