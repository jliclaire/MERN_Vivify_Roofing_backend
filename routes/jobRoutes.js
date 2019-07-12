const express = require('express');
const router = express.Router();

const { index, create, edit, destroy, email } = require('../controllers/jobController')

router.get('/', index);
router.post('/', create);
router.put('/:id', edit);
router.delete('/:id', destroy);
router.post('/email', email); // accepts POST requests from mailgun which contain new leads

module.exports = router;