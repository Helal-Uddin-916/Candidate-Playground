const { body } = require('express-validator');

exports.validateProfile = [
  body('name').notEmpty(),
  body('email').isEmail()
];
