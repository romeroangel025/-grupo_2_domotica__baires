const fs = require('fs');
const path = require('path');
const productos = require('../data/dataBase.json');
const { loadProducts,storeProducts } = require('../data/productsFunction');
const productsFilePath = path.join(__dirname, '../data/dataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = {
    detail: (req, res) => {
      const products=loadProducts();

      let producto = productos.find(producto => producto.id === +req.params.id)

      return res.render("productDetail", {
        title: "detalle",
        producto
      });
    }
  }
      
