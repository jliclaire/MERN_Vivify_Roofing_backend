const express = require('express');
const router = express.Router();

const { login, register, deleteUser } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);
router.delete('/users/:id', deleteUser);

module.exports = router;