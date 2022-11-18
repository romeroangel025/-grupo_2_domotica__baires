const db = require('../database/models')
const {check, body} = require('express-validator');
const bcryptjs = require('bcryptjs');//

module.exports = [
    check('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe ser un email válido'),
        
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .custom((value, { req }) => {
            return db.User.findOne({
              where: {
                email: req.body.email
              }
            }).then(user => {
              if (!user || !bcryptjs.compareSync(value, user.password)) {
                return Promise.reject()
              }
            }).catch(() => Promise.reject('Credenciales inválidas'))
          }).withMessage('credenciales invalidas').bail()
      ]