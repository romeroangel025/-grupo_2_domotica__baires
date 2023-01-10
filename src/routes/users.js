var express = require('express');
var router = express.Router();
const {login,register,processRegister,processLogin,profile,logout,profileEdit, profileEditUpdate}=require('../controllers/userController')


// ************ Middlewares Require ************
const upload = require('../middlewares/uploadFiles.js');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const userSessionCheck = require('../middlewares/userSessionCheck');
const profileEditValidation = require('../validations/profileEditValidation');

/* GET users listing. */
router.get('/login', login);
router.post('/login',loginValidator,processLogin);
router.get('/register', register);
router.post('/register',upload.single('avatar'),registerValidator,processRegister)
router.get('/profile',userSessionCheck,profile);
router.get('/logout', logout)
router.get('/profileEdit', profileEdit)
router.put('/profileEdit',upload.single('avatar'),profileEditValidation,profileEditUpdate)



module.exports = router;
