const express = require('express');
const router = express.Router();

const { login, register, identify } = require('../controllers/authController');

router.get('/identify-me', identify)
router.post('/login', login);
router.post('/register', register);

module.exports = router;