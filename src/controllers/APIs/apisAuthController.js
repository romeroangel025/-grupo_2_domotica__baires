const db = require("../../database/models");
const { compareSync, hashSync, hash, setRandomFallback } = require("bcryptjs");
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
        password: await hash(password?.trim(),10),
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



},


login: async (req,res) => {

try {
    const { email, password } = req.body;
console.log(email,password);//undefined

if(!email || !password){
return res.status(401).json({
    ok:false,
    status:401,
    msg:"El email y password son requeridos"
})

}

const {id,rol} = await db.User.findOne({ where: { email } });

if (!id) {
   return  res.status(401).json({
        ok:false,
        status:404,
        msg:"El usuario no existe"});

}

const token = await sign({id,rol},"domotica",{expiresIn:"4h"})

res.status(200).json({
    ok:true,
    status:200,
    token,
    urlData:`${req.protocol}://${req.get("host")}/auth/me/${token}`

})

} catch (error) {
    res.status(401).json({
        ok:false,
        status:500,
        msg:"error.message"
    });
}




}






}