const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');
const {route} = require("express/lib/router");
const fileUpload = require('../middleware/multer')
const multer = require('multer')

router.get('/', EmployeeController.getAllEmployees);
router.post('/',fileUpload.single('image'), EmployeeController.createEmployee);
router.get('/:id', EmployeeController.editEmployee);
router.put('/:id',fileUpload.single('image'), EmployeeController.updateEmployee);
router.delete('/:id', EmployeeController.deleteEmployee);


module.exports = router;