
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
  search:(req,res) => {
    let busqueda =  req.query.busqueda

    let result = products.filter (product => product.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    return res.render('results',{
      title : 'Resultado de Busqueda',
      products: result , 
      busqueda,
      toThousand

    })

  }
	
};