const path = require("path")

module.exports = {
    
image: (req,res) =>{

res.sendFile(path.join(__dirname,`../../../public/imagenes/imageUsers/${req.params.img}`))


},

update: async (req,res)=> {

},

remove:async(req,res)=>{

},


};