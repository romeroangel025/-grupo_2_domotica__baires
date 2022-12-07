const path = require("path")

module.exports = {
    
image: (req,res) =>{

res.sendFile(path.join(__dirname,`../../../public/imagenes/imageUsers/${req.params.img}`))


},

update: async (req,res)=> {
const{id}= req.userToken
const {name,surname,tel,email}= req.body

try {
    
const user = await db.User.findByPk(id)

user.name = name?.trim() || user.name;
user.surname = surname?.trim() || user.surname;
user.tel = tel?.trim() || user.tel;
user.email = email?.trim() || user.email;
user.avatar = req.file?.filename || user.avatar;



} catch (error) {
    
}

},

remove:async(req,res)=>{

},


};