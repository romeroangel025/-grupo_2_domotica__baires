var express = require('express');
var router = express.Router();
const {detail}=require('../controllers/productsController')

/* GET users listing. */
router.get('/detail',detail );

  

module.exports = router;