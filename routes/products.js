var express = require('express');

var router = express.Router();
const {add,edit,store,destroy,update} = require('../controllers/productsController');
const {detail} = require('../controllers/detailControllers')


/* GET users listing. */
router.get('/detail/:id', detail );

/*** CREATE ONE PRODUCT ***/ 
router.get('/productAdd', add);
router.post('/store', store); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id',edit); 
router.put('/edit/:id',update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', destroy); 

module.exports = router;