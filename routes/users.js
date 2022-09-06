var express = require('express');
var router = express.Router();
const {login,register,processRegister}=require('../controllers/userController')


// ************ Middlewares Require ************
const upload = require('../middlewares/uploadFiles.js')

/* GET users listing. */
router.get('/login', login);
router.get('/register', register);
router.post('/register',upload.single('file'),processRegister)
  

module.exports = router;
