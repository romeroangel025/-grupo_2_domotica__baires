const db = require("../../database/models");
const path = require("path");
const { Op } = require("sequelize");
const fs = require("fs");

const { sendJsonError } = require("../../helpers/sendJsonError");
sendJsonError;
const controller = {
  image: (req, res) => {
    res.sendFile(
      path.join(
        __dirname,
        `../../../public/imagenes/imageProducts/${req.params.img}`
      )
    );
  },
  all: async (req, res) => {
    try {

const {page = 1 ,limit = 10 ,offset = 0} = req.query



      const products = await db.Product.findAll();
      return res.status(200).json({
        ok: true,
        status: 200,
        data: products,
      });

    } catch (error) {
      sendJsonError(error, res);
    }
  },
};

module.exports = controller;
