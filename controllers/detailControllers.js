const products = require('../data/dataBase.json');

module.exports = {
    detail: (req, res) => {

      const product = products.find(product => product.id === +req.params.id)
      return res.render("productDetail", {
        title: "Detalle",
        product
      });
    }
  }
      
