module.exports = (req,res,next) => {
    if(req.session.userLogin){
        res.locals.userLogin = req.session.userLogin
    }

    next()
    // si existe req.session.userLogin, guardame los datos en "res.locals.userLogin", este midelword lo llamo como una funcion de aplicacion global
}