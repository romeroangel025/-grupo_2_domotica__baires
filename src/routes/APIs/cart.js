var express = require('express');
var router = express.Router();
const {list, addItem, removeItem,removeAllItem} = require('../../controllers/APIs/apiCartController')

/* GET home page. */
// /api/cart
router
     .get('/', list)
     .post('/', addItem)
     .delete('/all/:id', removeAllItem)
     .delete('/:id', removeItem)
     


module.exports = router;