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
        avatar: req.file ? req.file.filename : "userDefault.png",
        createdAt: new Date(),
        updateAt: new Date(),
      })
        .then((user) => {
          const { id, name, surname, rol, avatar } = user;
          req.session.userLogin = {
            id,
            name,
            surname,
            rol,
            avatar,
          };
         // console.table(req.session.userLogin);
          if (req.body.remember) {
            res.cookie("domotica", req.session.userLogin, {
              maxAge: 1000 * 60,
            });
          }
          res.redirect("/users/profile");
        })
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
          const { id, name ,surname,email,rol, avatar } = user;
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
          return res.redirect("/users/profile");
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
  logout: (req, res) => {
    //primero destrullo la session y luego lo dirijimos al HOME.
    req.session.destroy();
    res.cookie("domotica", null, { maxAge: -1 });
    res.redirect("/");
  },
  profileEdit:(req,res)=> {
    return res.render("profileEdit", {
      title: "Editar perfil",
    });
  }};
