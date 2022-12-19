const db = require("../database/models");
const fs = require("fs");
const path = require("path");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); ////
const { validationResult } = require("express-validator");

module.exports = {
  ////
  index: (req, res) => {
    db.Product.findAll({
      include: ["images"],
    }).then((products) =>
      res.render("productlist", {
        title: "Lista de productos",
        products,
        toThousand,
      })
    );
  },

  /////

  add: (req, res) => {
    db.Category.findAll({
      attributes: ["id", "title"],
      order: ["title"],
    })
      .then((categories) => {
        return res.render("productAdd", {
          title: "añadir producto",
          categories,
        });
      })
      .catch((error) => console.log(error));
  },
  // Create -  Method to store
  store: (req, res) => {
    let errors = validationResult(req);
    /* return res.send(errors) */
    if (errors.isEmpty()) {
      db.Product.create({
        ...req.body,
        title: req.body.title.trim(),
        description: req.body.description.trim(),
      })
        .then((product) => {
          const images = req.files?.map((file) => {
            return {
              name: file.filename,
              product_id: product.id,
              /* createAt:new Date() */
            };
          }) || [{ name: "default-image.png", 
          product_id: product.id }];

          /*  let image = req.files ? req.files.filename : "default-image.png"; */
          db.Image.bulkCreate(images).then(() => {
            return res.redirect("/products");
          });
        })
        .catch((error) => console.log(error));
    } else {
      db.Category.findAll({
        attributes: ["id", "title"],
        order: ["title"],
      })
        .then((categories) => {
          return res.render("productAdd", {
            title: "añadir producto",
            categories,
            errors: errors.mapped(),
            old: req.body,
          });
        })
        .catch((error) => console.log(error));
    }
  },

  edit: (req, res) => {
    let categories = db.Category.findAll({
      attributes: ["id", "title"],
      order: ["title"],
    });

    let product = db.Product.findByPk(req.params.id);

    const images = req.files?.map((file) => {
      return {
        name: file.filename,
        product_id: product.id,
        /* createAt:new Date() */
      };
    }) || [{ name: "default-image.png", product_id: product.id} ]
    

    /*  let image = req.files ? req.files.filename : "default-image.png"; */
    let imagesEdit = db.Image.bulkCreate(images).then(() => {
      return images;
    });

    Promise.all([categories, product, imagesEdit])
      .then(([categories, product, imagesEdit]) => {
        return res.render("productEdit", {
          title: "editar producto",
          product,
          categories,
          imagesEdit,
        });
      })
      .catch((error) => console.log(error));
  },
  // Update - Method to update
  update: async (req, res) => {
    try {
      let errors = validationResult(req);

      if (errors.isEmpty()) {
        const {
          title,
          description,
          discount,
          price,
          category_id,
          //quantity = 10,
        } = req.body;

        let product = await db.Product.findByPk(req.params.id, {
          include: ["images"],
        });
        console.log(product);
        product.title = title.trim();
        product.price = price;
        product.discount = discount;
        product.description = description.trim();
        product.category_id = category_id;

        const imagesEdit = req.files?.map((file) => {
          return {
            name: file.filename,
            product_id: product.id,
            /* createAt:new Date() */
          };
        }) || [{ name: "default-image.png", product_id: product.id }];
        console.log(imagesEdit);

        await product.save();
        // await images.save();
        // borro las imagenes

        if(req.files.length){
          console.log("req.files");
          product.images.forEach(async (image) => {
            const file = path.join(
              __dirname,
              `../../public/imagenes/imageProducts/${image.name}`
            );
            //fs.unlinkSync(file);
  
            if (fs.existsSync(file)) {
              fs.unlinkSync(`./public/imagenes/imageProducts/${image.name}`);
            }
  
            await db.Image.destroy({
              where: {
                name: image.name,
              },
            });
          });
          // guardo en db las nuevas imagenes
          await db.Image.bulkCreate(imagesEdit);
        }


        res.redirect("/products/detail/" + req.params.id);
      } else {
        let categories = await db.Category.findAll({
          attributes: ["id", "title"],
          order: ["title"],
        });

        let product = await db.Product.findByPk(req.params.id);
        return res.render("productEdit", {
          title: "editar producto",
          product,
          categories,
          errors: errors.mapped(),
          old: req.body,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  // Delete - Delete one product from DB
  destroy: (req, res) => {
    db.Product.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.redirect("/"))
      .catch((error) => console.log(error));
  },
};
