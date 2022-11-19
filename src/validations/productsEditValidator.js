const {check,body} = require("express-validator");

module.exports=[

    check("title")
    .notEmpty()
    .withMessage("El nombre de producto es obligatorio").bail()
    .isLength({
        min: 3,
        max: 60
    }).withMessage("El nombre debe tener entre 3 y 12 caracteres"),

check("category_id")
    .notEmpty()
    .withMessage("La categoria del producto es obligatoria"),

check("description")
    .notEmpty()
    .withMessage("La descripcion del producto es obligatorio"),

check("price")
    .notEmpty()
    .withMessage("El precio del producto es obligatorio")
    .isNumeric({
        no_symbols: true
    }).withMessage("solo números positivos"),
    check("discount")
    .notEmpty()
    .withMessage("El descuento del producto es obligatorio")
    .isNumeric({
        no_symbols: true
    }).withMessage("solo números positivos"),
    
   /*  body("imagenes")
    .custom((value, { req }) => {
      if (req.files.length === 5&&) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage("Debes agregar dos imagenes"),
*/

    




]