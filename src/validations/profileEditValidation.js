const db = require('../database/models')
const {check, body} = require('express-validator');
const bcryptjs = require('bcryptjs');//


module.exports = [

    check('name')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isAlpha('es-ES').withMessage('No se permite esos caracteres').bail()
    .isLength({
        min: 2
    }).withMessage('Como mínimo 2 caracteres'),

check('surname')
    .notEmpty()
    .withMessage("El apellido es obligatorio")
     .bail()
    /*  .matches(/^\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]/)
    .withMessage("Solo letras")  */
    .bail()
    .isLength({
        min: 2,
    })
    .withMessage("Como mínimo 2 caracteres"),

/* body("email")
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debe ser un email válido').bail()
    .custom((value) => {
        return db.User.findOne({
            where: {
                email: value,
            },
        }).then((user) => {
            if (user) {
                return Promise.reject("Este email ya está registrado");
            }
        });
    }),
 */


check('tel')
    .notEmpty().withMessage('EL numero de telefono es obligatorio').bail()
    .isLength({
        min: 8,
        max: 15
    }).withMessage('Ingrese su numero con el codigo de area'),





]