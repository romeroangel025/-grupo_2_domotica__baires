const express = require('express');
const router = express.Router();
const {totals} = require('../../controllers/APIs/mainAPIController');

//Rutas
router.get('/totals', totals);

module.exports = router;