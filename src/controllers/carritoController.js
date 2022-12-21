const db = require("../database/models");
module.exports = {
  carrito: (req, res) => {
      return res.render("productCart", {
        title: "Carrito",
        items : req.session.orderCart.items,
        total :  req.session.orderCart.total,
      })
  },
};
