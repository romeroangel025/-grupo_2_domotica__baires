var express = require('express');

var router = express.Router();
const {add,edit,store,destroy,update,index} = require('../controllers/productsController');
const {detail} = require('../controllers/detailControllers')

// ************ Middlewares Require ************
const adminUserCheck =require('../middlewares/adminUserCheck')//area valida para administradores

const uploadProducts = require('../middlewares/uploadFilesProducts');
const productsAddValidator = require('../validations/productsAddValidator');
const productsEditValidator = require('../validations/productsEditValidator');





router.get('/', index); 
/* GET users listing. */
router.get('/detail/:id', detail );

/*** CREATE ONE PRODUCT ***/ 
router.get('/productAdd',adminUserCheck, add);
router.post('/store', uploadProducts.array("imagenes"),productsAddValidator,store); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id',adminUserCheck,edit); 
router.put('/edit/:id',productsEditValidator,update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', destroy); 

module.exports = router;