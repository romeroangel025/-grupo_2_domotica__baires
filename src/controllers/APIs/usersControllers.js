const path = require("path");
const { literal } = require("sequelize");
const db = require("../../database/models");

module.exports = {
    
image: (req,res) =>{

res.sendFile(path.join(__dirname,`../../../public/imagenes/imageUsers/${req.params.img}`))


},

update: async (req,res)=> {
const{id}= req.userToken
const {name,surname,tel,email}= req.body

try {
    const options =  {
        attributes :{
               exclude:["deletedAt","password"],
               include:[[literal(`CONCAT( '${req.protocol}://${req.get("host")}/APIs/users/image/',avatar )`),'avatar']]
           }
           }
    
const user = await db.User.findByPk(id,options)

user.name = name?.trim() || user.name;
user.surname = surname?.trim() || user.surname;
user.tel = tel?.trim() || user.tel;
user.email = email?.trim() || user.email;
user.avatar = req.file?.filename || user.avatar;

await user.save()

return res.status(200).json({
    ok:true,
    status:200,
    data : user
})

} catch (error) {
   return console.log(error);
}

},

remove:async(req,res)=>{

},


};