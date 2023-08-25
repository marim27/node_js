const express = require("express");
var router = express.Router();
var {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  getTodoOfUser,
  login,
} = require(`../controllers/user`);

router.post("/login", login);
router.route("/").post(createUser) // create a new user
router.route("/").get(getAllUser)  // get all users
router.route("/:id").get(getUser)   // get user by id
router.route("/:id").patch(updateUser)  // Update user data
router.route("/:id").delete(deleteUser)  //delete user
router.route("/:id/todo").get(getTodoOfUser)  //get todo by /user/:id/todo


module.exports = router;
