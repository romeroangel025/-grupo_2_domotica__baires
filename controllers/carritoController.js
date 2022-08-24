const products = require('../data/dataBase.json');
module.exports = {
    carrito: (req, res) => {
      let carrito = products.filter(product => product.categoria === 'carrito')
      return res.render("productCart", {
        title: "Carrito", carrito
      
      });
    },
  };