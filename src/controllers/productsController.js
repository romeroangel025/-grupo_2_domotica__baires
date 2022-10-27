const db = require("../database/models");
const fs = require("fs");
const path = require("path");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); ////

const productsFilePath = path.join(__dirname, "../data/DataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

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
        }) || [{ name: "default-image.png", product_id: product.id }];

        /*  let image = req.files ? req.files.filename : "default-image.png"; */
        db.Image.bulkCreate(images).then(() => {
          return res.redirect("/products");
        });
      })
      .catch((error) => console.log(error));
  },

  edit: (req, res) => {
    let categories = db.Category.findAll({
      attributes: ["id", "title"],
      order: ["title"],
    });

    let product = db.Product.findByPk(req.params.id);

    Promise.all([categories, product])
      .then(([categories, product]) => {
        return res.render("productEdit", {
          title: "editar producto",
          product,
          categories,
        });
      })
      .catch((error) => console.log(error));
  },
  // Update - Method to update
  update: (req, res) => {
    db.Product.update(
      {
        ...req.body,
        name: req.body.title.trim(),
        description: req.body.description.trim(),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(() => res.redirect("/products/detail/" + req.params.id))
      .catch((error) => console.log(error));
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
