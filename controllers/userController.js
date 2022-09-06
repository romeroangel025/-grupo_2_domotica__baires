const {loadUsers, storeUsers} = require('../data/usersFunction');
//const {validationResult} =require('express-validator');
const bcryptjs = require('bcryptjs');



module.exports = {
  processRegister:(req,res)=>{

   // return res.send(req.body);

const{name,email,tel,password}=req.body;

let users = loadUsers();

let newUser = {
  id : users.length > 0 ? users[users.length - 1].id + 1 : 1,
  name :name.trim(),
  tel : tel.trim(),
  email : email.trim(),
  password : bcryptjs.hashSync(password,12),
  rol : 'user',
  file:req.file.filename
  
}
let usersModify = [...users, newUser];
    
storeUsers(usersModify);

return res.redirect('/users/login');


  }
    ,
    register:(req,res)=>{
        return res.render('register',{
             title:'register'
        }
       );
    },
    login: (req, res) => {
      return res.render("login", {
        title: "login"
      
      });

    }

  };