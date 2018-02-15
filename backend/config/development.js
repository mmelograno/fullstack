'use strict';

module.exports = {
  db: process.env.DB || 'mongodb://mongo/nodeapp',
  swagger: process.env.SWAGGER,
  basePath: '/',
  secret: process.env.SECRET || 'mySecretAwesome',
  logLevel: 'debug',
  host: process.env.HOST || 'localhost:3000',
  mail: {
    from: 'email@email.com',
    host: '',
    port: 465,
    account: {
      user: 'myUser',
      pass: 'myPass',
    },
  },
};
