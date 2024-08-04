const express = require('express');
const uploader = require('../middleware/fileUpload');
const fileController = require('../controllers/fileController');
const verifyToken = require('../middleware/verifyToken')
const router = express.Router();

router.post('/upload-profile', uploader.single('file'), fileController.uploadProfile);

router.post('/upload', verifyToken, uploader.single('file'), fileController.uploadFile)

router.get('/', verifyToken, fileController.getUserFiles)

router.get('/videos/:videoId', fileController.streamVideo)

module.exports = router;


// {
//     fieldname: 'file',
//     originalname: '310.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: 'uploads/',
//     filename: 'ba7711a8-6433-4336-a634-d877389de317-1722627405898-310.jpg',
//     path: 'uploads\\ba7711a8-6433-4336-a634-d877389de317-1722627405898-310.jpg',
//     size: 713151
//   }