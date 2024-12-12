var express = require('express');
const { AddProject, UpdateProject, DeleteProject, ProjectDetails, GetAllProjects } = require('../controllers/projectcontroller');
var router = express.Router();

/* GET users listing. */
router.post('/addproject',AddProject);
router.put('/updateproject/:project_Id',UpdateProject);
router.delete('/deleteproject/:project_Id',DeleteProject);
router.get('/projectdetails/:project_Id',ProjectDetails);
router.get('/getallprojects',GetAllProjects)


module.exports = router;