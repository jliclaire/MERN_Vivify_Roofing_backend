const express = require('express');
const router = express.Router();

const { index, create, edit, destroy } = require('../controllers/jobController')

router.get('/', index);
router.post('/', create);
router.put('/:id', edit);
router.delete('/:id', destroy);

module.exports = router;