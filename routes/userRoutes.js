const express = require('express');
const router = express.Router();

const {
  names,
  destroy,
} = require('../controllers/userController')

router.get('/', names)
router.delete('/:id', destroy)

module.exports = router;