var express = require('express');
const { AddEmployee, GetAllEmployees, UpdateEmployee, DeleteEmployee, EmployeeDetails } = require('../controllers/employeecontroller');
var router = express.Router();

/* GET users listing. */
router.post('/addemployee',AddEmployee);
router.put('/updateemployee/:employee_Id',UpdateEmployee);
router.delete('/deleteemployee/:employee_Id',DeleteEmployee);
router.get('/employeedetails/:employee_Id',EmployeeDetails);
router.get('/getallemployees',GetAllEmployees)


module.exports = router;