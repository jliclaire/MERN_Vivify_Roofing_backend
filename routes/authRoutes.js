const express = require('express');
const router = express.Router();

const { login, register, allUsers, deleteUser } = require('../controllers/authController');

router.get('/users', allUsers);
router.post('/login', login);
router.post('/register', register);
router.delete('/users/:id', deleteUser);

module.exports = router;