const db = require('../database/models');
const fs = require('fs');
const path = require('path');
const { loadProducts,storeProducts } = require('../data/productsFunction.js');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");////


const productsFilePath = path.join(__dirname, '../data/DataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


module.exports = {
////
	index: (req, res) => {
		/* const products = loadProducts()

		return res.render('productlist', {title: 'Lista de productos' ,products, toThousand }) */
		// Do the magic
		db.Product.findAll({
			include : ['images']
		})
			.then(products =>
				res.render('productlist', {
				title: 'Lista de productos',
				products,
				toThousand
			}))
			
	},

/////
    
    add:(req, res) => {
   /*    return res.render("productAdd", {
        title: "añadir producto"
      
      }); */

	  db.Category.findAll({
		attributes : ['id','title'],
		order : ['title']
	})
		.then(categories => {
			return res.render('productAdd', {
				title: "añadir producto",
				categories
			})
		})
		.catch(error => console.log(error))


    },
    // Create -  Method to store
	store: (req, res) => {
		// Do the magic
		/* const { id } = req.params;
		let { nombre, precio, descuento, descripcion, categoria} = req.body;
		//const imagen = req.files["image"] ;
		let newProduct = {
		  id: products[products.length - 1].id + 1,
		  nombre: nombre.trim(),
		  descripcion: descripcion,
		  precio: +precio,
		  descuento: +descuento,
		  categoria:categoria,
		  image: "default-image.png",
		};
	
		let productsNew = [...products, newProduct];
	
		storeProducts(productsNew);
		return res.redirect("/products"); */

		db.Product.create({
			...req.body/* ,
			title : req.body.title.trim(),
			description : req.body.description.trim() */
		})
			.then(product => {
				
					let image = req.file? req.file.filename : "default-image.png"
					db.Image.create(image,{
						validate : true
					}).then( (result) => console.log(result) )
			
				return res.redirect('/products')
			})
			.catch(error => console(error))
	},
    edit:(req, res) => {

      const product = products.find(product => product.id===+req.params.id);


      return res.render("productEdit", {
        title: "editar producto",product
      
      });

    },
    // Update - Method to update
	update: (req, res) => {
		//do the magic

		const { id } = req.params;
		let { nombre, precio, descuento, descripcion, categoria } = req.body;
	
		const productModify = products.map((product) => {
		  if (product.id === +id) {
			return {
			  ...product,
			  nombre: nombre.trim(),
			  descripcion: descripcion,
			  precio: +precio,
			  descuento: +descuento,
			  categoria:categoria,
			};
		  } else {
			return product;
		  }
		});
	
		storeProducts(productModify);
		return res.redirect("/products/detail/" + id);
	  },
    // Delete - Delete one product from DB
	destroy : (req, res) => {
		const {id} = req.params;
        const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'DataBase.json')));

        const productFilter = products.filter(product => product.id !== +id);

        storeProducts(productFilter);
        return res.redirect('/');
  }
  }
      
