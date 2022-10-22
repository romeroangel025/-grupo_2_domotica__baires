const db = require("../database/models");
const fs = require("fs");
const path = require("path");
const { loadProducts, storeProducts } = require("../data/productsFunction");

module.exports = {
  detail: (req, res) => {
    /* 
      const products=loadProducts();

      let producto = products.find(producto => producto.id === +req.params.id)

      return res.render("productDetail", {
        title: "detalle",
        producto
      });
    } */
    let categories = db.Category.findAll({
      attributes: ["id", "title"],
      order: ["title"],
    });

    let product = db.Product.findByPk(req.params.id, {
      include: ["images"],
    });

    Promise.all([categories, product]).then(([categories, product]) => {
      // return res.send(product)
      return res.render("productDetail", {
        title: "editar producto",
        product,
        categories,
      });
    });
  },
};
