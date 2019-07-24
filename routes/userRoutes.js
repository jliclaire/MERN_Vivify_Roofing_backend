const express = require('express');
const router = express.Router();
const { checkJWT } = require('../middleware/jwtMiddleware.js')

const {
  names,
  destroy,
  getSales
} = require('../controllers/userController')

router.get('/', checkJWT, names)
router.get('/sales', checkJWT, getSales)
router.delete('/:id', checkJWT, destroy)

module.exports = router;