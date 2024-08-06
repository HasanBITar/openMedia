const express = require('express');
const permissionController = require('../controllers/permissionController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();


// getAllUsers: 'permission/users',
//   getMyFiles: 'permission/myfiles',
// permission/mypermissions
// addPermissions : 'permission/add
// deletePermission : 'permission/delete',


router.get('/users', verifyToken, permissionController.getAllUsers);
router.get('/myfiles', verifyToken, permissionController.getMyFiles);
router.get('/mypermissions', verifyToken, permissionController.getMyPermissions);
router.post('/add', verifyToken, permissionController.addPermissions);
router.delete('/delete/:permissionId', verifyToken, permissionController.deletePermission);



module.exports = router;
