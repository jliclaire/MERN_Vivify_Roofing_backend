const express = require('express');
const router = express.Router();

const {
  names,
  destroy,
  getSales
} = require('../controllers/userController')

router.get('/', names)
router.get('/sales', getSales)
router.delete('/:id', destroy)

module.exports = router;