const express = require('express');
const permissionController = require('../controllers/permissionController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();


// getAllUsers: 'permission/users',
//   getMyFiles: 'permission/myfiles',
// permission/mypermissions
// addPermissions : 'permission/add

router.get('/users', verifyToken, permissionController.getAllUsers);
router.get('/myfiles', verifyToken, permissionController.getMyFiles);
router.get('/mypermissions', verifyToken, permissionController.getMyPermissions);
router.post('/add', verifyToken, permissionController.addPermissions)


module.exports = router;
