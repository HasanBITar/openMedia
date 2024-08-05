const express = require('express');
const groupController = require('../controllers/groupController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/group', verifyToken, groupController.getAllGroups);
router.post('/group', verifyToken, groupController.addGroup);
router.delete('/group/:groupId', verifyToken, groupController.deleteGroup);

router.get('/group/:groupId', verifyToken, groupController.getUsersOfGroup);
router.post('/group/:groupId', verifyToken, groupController.addUserToGroup);
router.delete('/group/:groupId/:userId', verifyToken, groupController.deleteUserFromGroup);



module.exports = router;
