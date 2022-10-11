const fs = require('fs');
const path = require('path');
const { loadProducts,storeProducts } = require('../data/productsFunction');


module.exports = {
    detail: (req, res) => {
      const products=loadProducts();

      let producto = products.find(producto => producto.id === +req.params.id)

      return res.render("productDetail", {
        title: "detalle",
        producto
      });
    }
  }
      
