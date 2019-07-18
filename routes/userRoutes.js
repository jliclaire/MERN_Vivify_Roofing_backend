const express = require('express');
const router = express.Router();

const {
  index,
  show,
  create,
  edit,
  destroy
} = require('../controllers/userController')

router.get('/', index)
router.get('/:id', show)
router.post('/', create)
router.put('/:id', edit)
router.delete('/:id', destroy)

module.exports = router;