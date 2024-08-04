const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${req.userId}--${Date.now()}__${file.originalname}`);
    },
});

const uploader = multer({ storage: storage });

module.exports = uploader
