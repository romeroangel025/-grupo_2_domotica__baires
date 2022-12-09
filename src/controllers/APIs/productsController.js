const db = require("../../database/models");
const path = require("path");
const { Op } = require("sequelize");
const fs = require("fs");

const { sendJsonError } = require("../../helpers/sendJsonError");
const { literalQueryUrlImage } = require("../../helpers/literalQueryUrlImage");

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
      let { page = 1, limit = 5, offset = 0 } = req.query;

      limit = +limit > 10 ? 10 : +limit;

      page = +page <= 0 || isNaN(+page) ? 1 : +page;

      page -= 1;

      offset = page * limit;

      const { count, rows: products } = await db.Product.findAndCountAll({
        limit,
        offset,
        include: [
          {
            association: "images",
            attributes: {
              include: [
                literalQueryUrlImage(req, "images.name", "urlImage"), //preguntar por los parametros
              ],
              exclude: ["updatedAt", "createdAt", "deletedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["updatedAt", "deletedAt"],
        },
      });

const existPrev = page>0 && offset<= count
const existNext = Math.floor(count / limit )>=( page+1 )&& limit!=count;

let urlPrev = null;
let urlNext = null;
if (existNext) {
    urlNext = `${req.protocol}://${req.get("host")}${req.baseUrl}?page=${page+2}`
}

if (existPrev) {
    urlPrev = `${req.protocol}://${req.get("host")}${req.baseUrl}?page=${page}`
}

      return res.status(200).json({
        meta: {
          ok: true,
          status: 200,
        },
        data: {
          totalProducts: count,
          prev: urlPrev,
          next: urlNext,
          products,
        },
      });
    } catch (error) {
      sendJsonError(error, res);
    }
  },
};

module.exports = controller;
