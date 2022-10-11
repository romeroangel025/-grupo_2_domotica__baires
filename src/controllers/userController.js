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
        avatar : req.file? req.file.filename : "userDefault.png"
      };
      let usersModify = [...users, newUser];
  
      storeUsers(usersModify);
  
      return res.redirect("/");
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

     let {id,name,surname, rol, avatar} = loadUsers().find(user => user.email === req.body.email);
    
     req.session.userLogin ={
      id,
      name,
      surname,
      rol,
      avatar
  };

  if(req.body.remember){
    res.cookie('domotica',req.session.userLogin,{
        maxAge : 1000 * 60
    })
}
    
    
   
    
    
    
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

    let user = loadUsers().find(user =>user.id === req.session.userLogin.id)


    return res.render("profile",{
      title:"perfil",user
    })
  },
  logout:(req,res) => {
    //primero destrullo la session y luego lo dirijimos al HOME.
    req.session.destroy()
    res.cookie('domotica',null,{maxAge: -1});
    res.redirect('/')
}
};
