const express = require("express");
var todoModel = require(`../models/todo`);
var auth = require("../middlewares/auth");
var router = express.Router();
var {
  createTodo,
  getAllTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} = require(`../controllers/todo`);

router.use(auth); 
router.route("/").post(createTodo)   //add a new todo
router.route("/").get(getAllTodo)    //get all todos
router.route("/:id").get(getTodo)    //get todo by id
router.route("/:id").patch(updateTodo)   //update todo
router.route("/:id").delete(deleteTodo)   //delete todo

module.exports = router;
