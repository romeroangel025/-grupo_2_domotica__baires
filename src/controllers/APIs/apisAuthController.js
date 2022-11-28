const db = require("../../database/models");
const { compareSync, hashSync } = require("bcryptjs");
const {sign} = require("jsonwebtoken")

module.exports = {
// register controller
register: async (req,res) => {
const {name,surname,email,password,avatar,tel } = req.body

try {
    if(!email || !password){
        res.status(401).json ({
            ok:false,
            status:401
        });
    }
    
 const {id,rol} = await db.User.create({
        name: name?.trim(),
        surname: surname?.trim(),
        email: email?.trim(),
        tel,
        password:password?.trim(),
        rol: "user",
        avatar: req.file?.filename || "userDefault.png",
        createdAt: new Date(),
        updateAt: new Date(),
});



const token = await sign({id,rol},"domotica",{expiresIn:"4h"}) 

return res.status(201).json({
    ok:true,
    status:201,
    token
})




} catch (error) {
   
    res.status(500).json({
        ok:false,
        status:500,
        msg:"Error en el servidor"
    })

}



}






}