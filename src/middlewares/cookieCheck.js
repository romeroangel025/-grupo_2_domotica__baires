module.exports = (req,res,next) => {
    if(req.cookies.domotica){
        req.session.userLogin = req.cookies.domotica
    }
    next()
}

