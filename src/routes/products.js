var express = require('express');

var router = express.Router();
const {add,edit,store,destroy,update,index} = require('../controllers/productsController');
const {detail} = require('../controllers/detailControllers')
const adminUserCheck =require('../middlewares/adminUserCheck')//area valida para administradores




router.get('/', index); 
/* GET users listing. */
router.get('/detail/:id', detail );

/*** CREATE ONE PRODUCT ***/ 
router.get('/productAdd',adminUserCheck, add);
router.post('/store', store); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id',adminUserCheck,edit); 
router.put('/edit/:id',update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', destroy); 

module.exports = router;