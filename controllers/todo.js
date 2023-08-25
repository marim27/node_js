const todoModel = require(`../models/todo`);
// add new todo
var createTodo=async (req, res) => {
  var todo = req.body;
  try {
    var careatedTodo = await todoModel.create(todo);;
    res.status(201).json(careatedTodo);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}
// get all todos
var getAllTodo=async (req, res) => {
  try {
    var allTodos = await todoModel.find().populate("userId");
    res.status(201).json(allTodos);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}
// get to do by id
var getTodo=async (req, res) => {
  var id = req.params.id;
  try {
    var todo = await todoModel.findById({ _id: id });
    res.status(201).json(todo);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}
//update todo
var updateTodo=async (req, res) => {
  var id = req.params.id;
  var { title } = req.body;
  try {
    var update = await todoModel.updateOne({ _id: id }, { title: title });
    res.status(201).json(update);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}
// delete todo
var deleteTodo= async (req, res) => {
  var id = req.params.id;
  try {
    var todo = await todoModel.deleteOne({ _id: id });
    res.status(201).json(todo);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

module.exports = { createTodo, getAllTodo, getTodo, updateTodo, deleteTodo };
