const { loadUsers, storeUsers } = require("../data/usersFunction");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");

module.exports = {
  processRegister: (req, res) => {
    // return res.send(req.body);

    let errors = validationResult(req);

    if(errors.isEmpty()){
      const { name, email, tel, password,surname } = req.body;

      let users = loadUsers();
  
      let newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name: name.trim(),
        surname: surname.trim(),
        tel: tel.trim(),
        email: email.trim(),
        password: bcryptjs.hashSync(password, 12),
        rol: "user",
        avatar: req.file.filename,
      };
      let usersModify = [...users, newUser];
  
      storeUsers(usersModify);
  
      return res.redirect("/users/login");
    }else{
      return res.render('register',{
        title: 'Register',
        errors : errors.mapped(),
        old : req.body
    })
    }

    
  
  },
  processLogin:(req,res)=>{

    let errors = validationResult(req);

    if(errors.isEmpty()){

     let {id,name,username, rol, avatar} = loadUsers().find(user => user.email === req.body.email);
   
     return res.redirect("/users/profile");






    }else {
      return res.render('login',{
          title: 'Login',
          errors : errors.mapped()
      })

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
  profile: (req,res)=>{
    return res.render("profile",{
      title:"perfil"
    })
  },
  logout:(req,res) => {
    //primero destrullo la session y luego lo dirijimos al HOME.
    req.session.destroy()
    return res.send('aca estoy')
    res.redirect('/')
}
};
