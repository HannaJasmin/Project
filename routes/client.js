var express = require('express');
const { AddClient, GetAllClients, ClientDetails, UpdateClient, DeleteClient } = require('../controllers/clientcontroller');
var router = express.Router();

/* GET users listing. */
router.post('/addclient',AddClient);
router.put('/updateclient/:client_Id',UpdateClient);
router.delete('/deleteclient/:client_Id',DeleteClient);
router.get('/clientdetails/:client_Id',ClientDetails);
router.get('/getallclients',GetAllClients)


module.exports = router;