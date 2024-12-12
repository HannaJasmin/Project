var express = require('express');
const { AddDepartment,UpdateDepartment,DeleteDepartment, DepartmentDetails,  GetAllDepartments} = require('../controllers/departmentcontroller');
var router = express.Router();

/* GET users listing. */
router.post('/adddepartment',AddDepartment);
router.put('/updatedepartment/:department_Id',UpdateDepartment);
router.delete('/deletedepartment/:department_Id',DeleteDepartment);
router.get('/departmentdetails/:department_Id',DepartmentDetails);
router.get('/getalldepartments',GetAllDepartments)


module.exports = router;
