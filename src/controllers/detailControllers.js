const db = require("../database/models");
const fs = require("fs");
const path = require("path");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  detail: (req, res) => {
    let categories = db.Category.findAll({
      attributes: ["id", "title"],
      order: ["title"],
    });

    let product = db.Product.findByPk(req.params.id, {
      include: ["images"],
    });

    Promise.all([categories, product]).then(([categories, product]) => {
      return res.render("productDetail", {
        title: "editar producto",
        product,
        categories,
        toThousand
      });
    });
  },
};
