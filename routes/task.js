var express = require('express');
const { AddTask, UpdateTask, DeleteTask, TaskDetails, GetAllTasks } = require('../controllers/taskcontroller');
var router = express.Router();

/* GET users listing. */
router.post('/addtask',AddTask);
router.put('/updatetask/:task_Id',UpdateTask);
router.delete('/deletetask/:task_Id',DeleteTask);
router.get('/taskdetails/:task_Id',TaskDetails);
router.get('/getalltasks',GetAllTasks);


module.exports = router;