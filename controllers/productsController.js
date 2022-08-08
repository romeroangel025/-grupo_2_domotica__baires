
module.exports = {
    detail: (req, res) => {
      return res.render("productDetail", {
        title: "detalle"
      
      });
    },
    add:(req, res) => {
      return res.render("productAdd", {
        title: "añadir producto"
      
      });

    },
    edit:(req, res) => {
      return res.render("productEdit", {
        title: "eliminar producto"
      
      });

    },
  }
      
