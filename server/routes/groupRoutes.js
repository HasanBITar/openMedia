const express = require('express');
const groupController = require('../controllers/groupController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/', verifyToken, groupController.getAllGroups);
router.post('/', verifyToken, groupController.addGroup);
router.delete('/:groupId', verifyToken, groupController.deleteGroup);

router.get('/:groupId', verifyToken, groupController.getUsersOfGroup);
router.post('/:groupId', verifyToken, groupController.addUserToGroup);
router.delete('/:groupId/:userId', verifyToken, groupController.deleteUserFromGroup);



module.exports = router;
