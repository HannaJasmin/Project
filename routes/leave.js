var express = require('express');
const { AddLeave, LeaveDetails, GetAllLeaves, UpdateLeave, DeleteLeave } = require('../controllers/leavecontroller');
var router = express.Router();

/* GET users listing. */
router.post('/addleave',AddLeave);
router.put('/updateleave/:leave_Id',UpdateLeave);
router.delete('/deleteleave/:leave_Id',DeleteLeave);
router.get('/leavedetails/:leave_Id',LeaveDetails);
router.get('/getallleaves',GetAllLeaves)


module.exports = router;