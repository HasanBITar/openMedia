const express = require('express');
const tagController = require('../controllers/tagController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/', verifyToken, tagController.getAllTags);
router.post('/', verifyToken, tagController.addTag);
router.delete('/:tagId', verifyToken, tagController.deleteTag);



module.exports = router;
