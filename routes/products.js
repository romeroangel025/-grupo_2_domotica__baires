var express = require('express');

var router = express.Router();
const {detail,add,edit } = require('../controllers/productsController');

/* GET users listing. */
router.get('/detail',detail );
router.get('/productAdd',add);
router.get('/productEdit',edit);
  

module.exports = router;