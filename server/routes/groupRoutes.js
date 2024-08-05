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

http://localhost:5000/api/v1/group/non-members/29b0e7bb-e3a1-460c-b9e8-6e90a4f70e25
router.get('/non-members/:groupId', verifyToken, groupController.getNonMembers)



module.exports = router;
