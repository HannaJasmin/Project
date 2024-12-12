var express = require('express');
const { AddWork, GetAllWork, WorkDetails, DeleteWork, UpdateWork } = require('../controllers/workcontroller');
var router = express.Router();

/* GET users listing. */
router.post('/addwork',AddWork);
router.put('/updatework/:work_Id',UpdateWork);
router.delete('/deletework/:work_Id',DeleteWork);
router.get('/workdetails/:work_Id',WorkDetails);
router.get('/getallwork',GetAllWork);


module.exports = router;