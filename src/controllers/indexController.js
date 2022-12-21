
const { Op } = require('sequelize');
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
 //   let busqueda =  removeAccents(req.query.busqueda)
     
 
  /*   let result = products.filter (product => removeAccents(product.nombre.toLowerCase()).includes(busqueda.toLowerCase()))

    return res.render('results',{
      title : 'Resultado de Busqueda',
      products: result , 
      busqueda,
      toThousand

    }) */
    const {busqueda}= req.query;
    if(busqueda==""){
        
        return res.redirect("/")
    }
    else{
      db.Product.findAll({
        include: ["images"],
        where: {
          title: { [Op.like]: `%${busqueda}%` },
        }
      }).then((products) =>
        res.render("productlist", {
          title: "Lista de productos",
          products,
          toThousand,
        })
      );
    }
  },
iluminacion: async (req,res) => {
 
  let products = await db.Product.findAll({
   
    include: ['images'],
    where: {
      category_id: 5,
    }
  });
  



 res.render("iluminacion", {
          title: "Articulos de iluminacion",
          products,
          toThousand,
        })

},
alarmas: async (req,res) => {

  let products = await db.Product.findAll({
   
    include: ['images'],
    where: {
      category_id: 4,
    }
  });
  



 res.render("alarmas", {
          title: "Articulos de alarmas",
          products,
          toThousand,
        })

 
},
electronica: async (req,res) => {

  let products = await db.Product.findAll({
   
    include: ['images'],
    where: {
      category_id: 6,
    }
  });
  



 res.render("electronica", {
          title: "Articulos de electronica",
          products,
          toThousand,
        })



}
	
};