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
  search: (req, res) => {},

  all: async (req, res) => {
    try {
      let {
        limit = 10,
        sales = 0,
        order = "ASC",
        offset = 0,
        page = 1,
        salesDiscount = 10,
        search = "",// no se por que da before declaration acess
      } = req.query;

      const queriesValuesDefaultAndModify = {
        limit,
        order,
        sales,
        salesDiscount,
         search, 
      };

      limit = +limit > 10 ? 10 : +limit;

      salesDiscount = +salesDiscount < 5 ? 5 : +salesDiscount;

      page = +page <= 0 || isNaN(+page) ? 1 : +page;

      let urlQueries = "";
      const queries = queriesValuesDefaultAndModify;

      for (const key in queries) {
        urlQueries += `&${key}=${queries[key]}`;
      }

      page -= 1;

      offset = page * limit;

      let options = {
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
        order: [["title", order]],
        where: {
          [Op.or]: [
            {
              title: {
                [Op.substring]: search,
              },
            },
          ],
        },
      };

      const optionsSales = {
        ...options,
        where: {
          discount: {
            [Op.gte]: salesDiscount,
          },
        },
      };

      if (+sales == 1 && !isNaN(sales)) {
        options = optionsSales;
      }

      const { count, rows: products } = await db.Product.findAndCountAll(
        options
      );

if(!products.length){
    return res.status(200).json({
        ok:true,
        status:204,
        message:"No hay productos en esta pagina"
    })
}


      const existPrev = page > 0 && offset <= count;
      const existNext = Math.floor(count / limit) >= page + 1 && limit != count;

      let urlPrev = null;
      let urlNext = null;
      if (existNext) {
        urlNext = `${req.protocol}://${req.get("host")}${req.baseUrl}?page=${
          page + 2
        }${urlQueries}`;
      }

      if (existPrev) {
        urlPrev = `${req.protocol}://${req.get("host")}${
          req.baseUrl
        }?page=${page}`;
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
  detail: async (req,res) => {
    let options = {
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
        }
        ,
      };

      try {
        const data = await db.Product.findByPk(req.params.id, options);
  
        if (!data) {
          return sendJsonError("El producto no existe", res, 404);
        }
  
        return res.status(200).json({
          ok: true,
          status: 200,
          data,
        });
      } catch (err) {
        sendJsonError(err, res);
      }
  }
};

module.exports = controller;
