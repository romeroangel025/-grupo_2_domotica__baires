const products = require('../data/dataBase.json');

module.exports = {
    detail: (req, res) => {
      let product = productos.find(producto => producto.id === +req.params.id)

      return res.render("productDetail", {
        title: "detalle",
        producto
      });
    }
  }
      
