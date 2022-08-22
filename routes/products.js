var express = require('express');

var router = express.Router();
const {detail,add,edit } = require('../controllers/productsController');

/* GET users listing. */
router.get('/detail/:id',detail );
router.get('/productAdd/:id',add);
router.get('/productEdit/:id',edit);
  

module.exports = router;