var express = require('express');
const {carrito} = require('../controllers/carritoController');
var router = express.Router();


/* GET home page. */
router.get('/carrito', carrito);


module.exports = router;