const db = require("../database/models");
const { compareSync } = require("bcryptjs");
module.exports = {
// register controller
register: async (req,res) => {
const {name,surname,email,password,rol,avatar,tel } = req.body

try {
    if(!email || !password){
        res.status(401).json ({
            ok:false,
            status:401
        });
    }
    
await db.User.create({
    name:name.trim(),
    surname:surname.trim(),
    email:email.trim(),
    password:password.trim(),
    rol:""
    avatar:""
    tel:""
})




} catch (error) {
    
}



}






}