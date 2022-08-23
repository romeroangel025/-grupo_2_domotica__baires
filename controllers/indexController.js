
const products = require('../data/dataBase.json')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  index: (req, res) => {
    let oferta = products.filter(product => product.categoria === 'oferta')
    let destacado = products.filter(product => product.categoria === 'destacado')

    return res.render("index", {
      title: "Home",oferta,
      destacado,toThousand
            

    
    });
  },
};