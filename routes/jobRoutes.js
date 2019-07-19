const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });


const { 
  index,
  show,
  create, 
  edit, 
  destroy, 
  email, 
  uploadImage,
  editFollowup } = require('../controllers/jobController')

router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', edit);
router.delete('/:id', destroy);
router.post('/email', email); // accepts POST requests from mailgun which contain new leads
router.post('/:id/image', upload.single('file'), uploadImage);
router.put('/:jId/followups/:fId', editFollowup)

module.exports = router;