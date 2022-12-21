var express = require('express');
const {index,search,iluminacion,alarmas,electronica} = require('../controllers/indexController');
var router = express.Router();


/* GET home page. */
router.get('/', index);
router.get('/search', search)
router.get('/iluminacion', iluminacion)
router.get('/alarmas', alarmas)
router.get('/electronica', electronica)
router.get('/grupo',(req,res) => {
    res.render('grupo',{
        title:'GRUPO-2'
    })
} )
module.exports = router;
