const express = require('express');
const { validationResult } = require('express-validator');
const { loginValidator, registerValidator, changePasswordValidator } = require('../validators/authValidator');
const authService = require('../services/authService');
const router = express.Router();


router.post('/login', loginValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password, req);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/change-password', changePasswordValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { email, currentPassword, newPassword } = req.body;
    await authService.changePassword(email, currentPassword, newPassword);
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/register', registerValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const { email, password, username, role } = req.body; // Assuming you'll need email, password, and username for registration
    const newUser = await authService.registerAccount({ email, password, username, role });
    res.status(201).json({ message: 'Account registered successfully', user: newUser }); // Use 201 for successful creation
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
