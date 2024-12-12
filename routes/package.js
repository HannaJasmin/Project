var express = require('express');
const { AddPackage, UpdatePackage, DeletePackage, PackageDetails, GetAllPackages } = require('../controllers/packagecontroller');
var router = express.Router();

/* GET users listing. */
router.post('/addpackage',AddPackage);
router.put('/updatepackage/:package_Id',UpdatePackage);
router.delete('/deletepackage/:package_Id',DeletePackage);
router.get('/packagedetails/:package_Id',PackageDetails);
router.get('/getallpackages',GetAllPackages)


module.exports = router;