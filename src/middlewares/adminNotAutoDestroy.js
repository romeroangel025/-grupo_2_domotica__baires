



const preventAdminSelfRemoval = (req, res, next) => {
    console.log(req.userToken);
    const idParams = +req.params.id;
    const { id,rol } = req.userToken;

    if (rol === "admin"){
        return res.status(400).json({
            ok:false,
            status:400,
            msg:"No se puede autoeliminarse a si mismo"
        })};
next()

}

module.exports = {preventAdminSelfRemoval}