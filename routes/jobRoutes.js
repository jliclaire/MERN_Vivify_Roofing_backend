const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });


const { 
  index, 
  create, 
  edit, 
  destroy, 
  email, 
  uploadImage,
  editFollowup } = require('../controllers/jobController')

router.get('/', index);
router.post('/', create);
router.put('/:id', edit);
router.delete('/:id', destroy);
router.post('/email', email); // accepts POST requests from mailgun which contain new leads
router.post('/:id/image', upload.single('file'), uploadImage);
router.post('/:jId/followup/:fId', editFollowup)

module.exports = router;