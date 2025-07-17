const { body } = require('express-validator');

exports.loginValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

exports.registerValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name required'),
  body('role')
  .optional()
  .isIn(['admin', 'customer', 'vendor', 'influencer'])
  .withMessage('Role must be one of admin, customer, vendor, influencer')
];

exports.changePasswordValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('currentPassword').isLength({ min: 6 }).withMessage('Current password required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
];