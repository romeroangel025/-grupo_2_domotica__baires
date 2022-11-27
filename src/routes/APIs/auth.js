// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Middleware Require ************
//const { uploadImageAvatar } = require("../middlewares");

// ************ Controller Require ************
const { register, login, getUserAuthenticated } = require("../../controllers/APIs/apisAuthController");
//const { checkToken } = require("../middlewares/checkToken");


router
  /* POST REGISTER */
  .post("/register", register)

  /* POST LOGIN */
  //.post("/login", login)

  /* POST LOGIN */
  //.get("/me/:token?", getUserAuthenticated);

module.exports = router;