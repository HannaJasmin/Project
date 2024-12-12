var express = require('express');
const { AddUser, UpdateUser,LoginUser, DeleteUser, GetAllUser, GetAllUsers, UserDetails} = require('../controllers/usercontroller');
var router = express.Router();

/* GET users listing. */
router.post('/add',AddUser);
router.post('/login',LoginUser);
router.put('/update/:userId',UpdateUser);
router.delete('/delete/:userId',DeleteUser);
router.get('/userdetails/:userId',UserDetails);
router.get('/getallusers',GetAllUsers);


module.exports = router;
