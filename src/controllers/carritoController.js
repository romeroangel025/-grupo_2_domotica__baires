const db = require("../database/models");
module.exports = {
  carrito: (req, res) => {
    const categoryCart = 3;

    db.Product.findAll({
      include: ["images"],

      where: {
        category_id: categoryCart,
      },
    }).then((carrito) =>
      res.render("productCart", {
        title: "Lista de productos",
        title: "Carrito",
        carrito,
      })
    );
  },
};
