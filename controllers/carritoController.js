
module.exports = {
    carrito: (req, res) => {
      return res.render("productCart", {
        title: "Carrito"
      
      });
    },
  };