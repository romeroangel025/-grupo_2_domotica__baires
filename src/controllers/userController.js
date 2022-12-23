const db = require("../database/models");

const { validationResult } = require("express-validator");
const { hashSync, compare, hash } = require("bcryptjs");

module.exports = {
  processRegister: (req, res) => {

    let errors = validationResult(req);

    if (errors.isEmpty()) {
      const { name, surname, email, tel, password, avatar } = req.body;

      db.User.create({
        name: name.trim(),
        surname: surname.trim(),
        email: email.trim(),
        tel,
        password: hashSync(password, 10),
        rol: "user",
        avatar: req.file?.filename || "userDefault.png",
        createdAt: new Date(),
        updateAt: new Date(),
      })
        .then((user) => {/* 
          const { id, name, surname, email, rol, avatar } = user;
          req.session.userLogin = {
            id,
            name,
            surname,
            email,
            rol,
            avatar,
          };
          // console.table(req.session.userLogin);
          if (req.body.remember) {
            res.cookie("domotica", req.session.userLogin, {
              maxAge: 1000 * 60,
            });
          }
          //carrito

          db.Order.findOne({
            where: {
              users_id: req.session.userLogin.id,
              statusId: 1
            },
            include: [
              {
                association: 'items',
                atrributes: ['id', 'quantity'],
                include: [
                  {
                    association: 'product',
                    atrributes: ['id', 'title', 'price', 'discount'],
                    include: ['images']
                  }
                ]
              }
            ]
          }).then(order => {
           
            if (order) {
              req.session.orderCart = {
                id: order.id,
                total: order.total,
                items: order.items
              }
            } else {
              db.Order.create({
                total: 0,
                users_id: req.session.userLogin.id,
                statusId: 1
              }).then(order => {

                req.session.orderCart = {
                  id: order.id,
                  total: order.total,
                  items: items=[]
                }
              })
            }
            console.log("items 118",req.session.orderCart); 

            
          })
        }*/ return res.redirect("/users/login")}
        )
        .catch((error) => console.log(error));
    } else {
      return res.render("register", {
        title: "Register",
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
  processLogin: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.User.findOne({
        where: {
          email: req.body.email,
        },
      })
        .then((user) => {
          const { id, name, surname, email, rol, avatar } = user;
          req.session.userLogin = {
            id,
            name,
            surname,
            email,
            rol,
            avatar,
          };
          // console.table(req.session.userLogin);
          if (req.body.remember) {
            res.cookie("domotica", req.session.userLogin, {
              maxAge: 1000 * 60,
            });
          }
          //carrito

          db.Order.findOne({
            where: {
              users_id: req.session.userLogin.id,
              statusId: 1
            },
            include: [
              {
                association: 'items',
                atrributes: ['id', 'quantity'],
                include: [
                  {
                    association: 'product',
                    atrributes: ['id', 'title', 'price', 'discount'],
                    include: ['images']
                  }
                ]
              }
            ]
          }).then(order => {
           
            if (order) {
              req.session.orderCart = {
                id: order.id,
                total: order.total,
                items: order.items
              }
            } else {
              db.Order.create({
                total: 0,
                users_id: req.session.userLogin.id,
                statusId: 1
              }).then(order => {

                req.session.orderCart = {
                  id: order.id,
                  total: order.total,
                  items:[]
                }
              })
            }
            

            return res.redirect("/")
          })
        })
        .catch((error) => console.log(error));
    } else {
      return res.render("login", {
        title: "Login",
        errors: errors.mapped(),
      });
    }
  },

  register: (req, res) => {
    return res.render("register", {
      title: "register",
    });
  },

  login: (req, res) => {
    return res.render("login", {
      title: "login",
    });
  },

  profile: (req, res) => {
    db.User.findByPk(req.session.userLogin.id)
      .then((user) => {
        return res.render("profile", {
          title: "Perfil",
          user,
        });
      })
      .catch((error) => console.log(error));
  },

  profileEdit: (req, res) => {
    db.User.findByPk(req.session.userLogin.id)
      .then((user) => {
        return res.render("profileEdit", {
          title: "Editar Perfil",
          user,
        });
      })
      .catch((error) => console.log(error));
  },


  profileEditUpdate: (req, res) => {

    const { name, surname, email, tel } = req.body;
    let errors = validationResult(req);
    // return res.send(errors) 

    if (errors.isEmpty()) {
      db.User.update(
        {
          name: name.trim(),
          surname: surname.trim(),
          email: email.trim(),
          tel,
          rol: "user",
          avatar: req.file ? req.file.filename : req.session.userLogin.avatar,
          createdAt: new Date(),
          updateAt: new Date(),
        },
        {
          where: {
            id: req.session.userLogin.id,
          },
        }
      ).then(() => {




        req.session.userLogin = {
          ...req.session.userLogin,
          name,
          surname,
          tel,
          email,//no se como traer la imagen del usuario para actualizar el icono de perfil 
          avatar: req.file ? req.file.filename : req.session.userLogin.avatar,
        };
        // console.table(req.session.userLogin);
        if (req.cookies.domotica) {
          res.cookie("domotica", req.session.userLogin, {
            maxAge: 1000 * 60,
          })


        }
        return res.redirect("/users/profile")
      }
      )
        .catch((error) => console.log(error));

    } else {


      db.User.findByPk(req.session.userLogin.id)
        .then((user) => {
          return res.render("profileEdit", {
            title: "Editar Perfil",
            user,
            old: req.body,
            errors: errors.mapped(),
          });
        })
        .catch((error) => console.log(error));


    }










  },




  logout: (req, res) => {
    //primero destrullo la session y luego lo dirijimos al HOME.
    req.session.destroy();
    res.cookie("domotica", null, { maxAge: -1 });
    res.redirect("/");
  },



};
