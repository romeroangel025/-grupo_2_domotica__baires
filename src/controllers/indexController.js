const { Op } = require("sequelize");
const products = require("../data/dataBase.json");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const removeAccents = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const db = require("../database/models");

module.exports = {
  index: async (req, res) => {
    

    let destacados = await db.Product.findAll({
      include: ["images"],
      where: {
        category_id: 2, //categoria iluminacion
      },
    });

    let ofertas = await db.Product.findAll({
      include: ["images"],
      where: {
        category_id: 1, //categoria ofertas
      },
    });

    res.render("index", {
      title: "Articulos de iluminacion",
      destacados,
      ofertas,
      toThousand,
    });
  },
  search: (req, res) => {
    const { busqueda } = req.query;
    if (busqueda == "") {
      return res.redirect("/");
    } else {
      db.Product.findAll({
        include: ["images"],
        where: {
          title: { [Op.like]: `%${busqueda}%` },
        },
      }).then((products) =>
        res.render("productlist", {
          title: "Lista de productos",
          products,
          toThousand,
        })
      );
    }
  },
  iluminacion: async (req, res) => {
    let products = await db.Product.findAll({
      include: ["images"],
      where: {
        category_id: 5, //categoria iluminacion
      },
    });

    res.render("iluminacion", {
      title: "Articulos de iluminacion",
      products,
      toThousand,
    });
  },
  alarmas: async (req, res) => {
    let products = await db.Product.findAll({
      include: ["images"],
      where: {
        category_id: 4, //categoria  alarmas
      },
    });

    res.render("alarmas", {
      title: "Articulos de alarmas",
      products,
      toThousand,
    });
  },
  electronica: async (req, res) => {
    let products = await db.Product.findAll({
      include: ["images"],
      where: {
        category_id: 6, //categoria electronica
      },
    });

    res.render("electronica", {
      title: "Articulos de electronica",
      products,
      toThousand,
    });
  },
};
