var express = require('express');
var router = express.Router();
const {login,register,processRegister}=require('../controllers/userController')


// ************ Middlewares Require ************
const upload = require('../middlewares/uploadFiles.js');
const registerValidator = require('../validations/registerValidator');

/* GET users listing. */
router.get('/login', login);
router.get('/register', register);
router.post('/register',upload.single('avatar'),registerValidator,processRegister)
  

module.exports = router;
