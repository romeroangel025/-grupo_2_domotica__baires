
const products = require('../data/dataBase.json')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const removeAccents = str =>  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const db = require("../database/models")
/* 
    let busqueda =  removeAccents(req.query.busqueda);

    let result = products.filter (product => removeAccents(product.nombre.toLowerCase()).includes(busqueda.toLowerCase()))
    return res.render('results',{
      title : 'Resultado de Busqueda',
      products: result , 
      busqueda,
      toThousand

    }) */

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
    let busqueda =  removeAccents(req.query.busqueda)
/*     let busqueda =  req.query.busqueda
    let result = products.filter (product => product.nombre.toLowerCase().includes(busqueda.toLowerCase()))

 */
    let result = products.filter (product => removeAccents(product.nombre.toLowerCase()).includes(busqueda.toLowerCase()))

    return res.render('results',{
      title : 'Resultado de Busqueda',
      products: result , 
      busqueda,
      toThousand

    })

  }
	
};