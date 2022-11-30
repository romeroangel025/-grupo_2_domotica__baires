const { verify } = require("jsonwebtoken");

module.exports = async (req,res,next)=>{

try {
    
const token = req.header("Authorization") || req.params.token

if(!token){
    return res.status(401).json({
        ok:false,
        status:401,
        msg:"El token es requerido"
    })

}

const decoded = verify(token,"domotica16");

req.userToken = decoded //{id,rol}


} catch (error) {
    
}







}