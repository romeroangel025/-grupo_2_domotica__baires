// ************ Require's ************
const express = require("express");
const { image,remove,update } = require("../../controllers/APIs/usersControllers");



const router = express.Router();




const checkToken = require("../../middlewares/checkToken");
const { preventAdminSelfRemoval } = require("../../middlewares/adminNotAutoDestroy");







router

  /* UPDATE USER */
  .patch("/", checkToken, update)

  /* DELETE USER */
  .delete("/:id?", checkToken,preventAdminSelfRemoval,remove)

  /* PREVIEW IMAGE */
  .get("/image/:img", image);

module.exports = router;
