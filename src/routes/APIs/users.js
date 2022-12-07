// ************ Require's ************
const express = require("express");
const { image,remove,update } = require("../../controllers/APIs/usersControllers");

const router = express.Router();




const checkToken = require("../../middlewares/checkToken");





router

  /* UPDATE USER */
  .patch("/", checkToken, update)

  /* DELETE USER */
  .delete("/:id?", checkToken, remove)

  /* PREVIEW IMAGE */
  .get("/image/:img", image);

module.exports = router;
