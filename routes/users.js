var express = require('express');
var router = express.Router();
const {login,register,processRegister,processLogin,profile}=require('../controllers/userController')


// ************ Middlewares Require ************
const upload = require('../middlewares/uploadFiles.js');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');

/* GET users listing. */
router.get('/login', login);
router.post('/login',loginValidator,processLogin);
router.get('/register', register);
router.post('/register',upload.single('avatar'),registerValidator,processRegister)
router.get('/profile', profile);

module.exports = router;
