const userModel = require(`../models/user`);
const todoModel = require(`../models/todo`);
const jwt = require("jsonwebtoken");
const bcrypt = require(`bcrypt`);

// create a new user
var createUser=async (req, res) => {
  try {
    var user = await userModel.create(req.body)
    res.status(201).json(user);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}
// get all users
var getAllUser=async (req, res) =>  {
  try {
    var allUsers = await userModel.find()
    res.status(201).json(allUsers);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}
// get user by id
var getUser=async (req, res) => {
  var id = req.params.id;
  try {
    var user = await userModel.findById({ _id: id })
    res.status(201).json(user);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

// Update user data
var updateUser=async(req, res, next) =>{
  var {id} = req.params;
  var {name} = req.body
  try {
    await userModel.updateOne( {_id:id},{username: name});
    res.status(201).json(req.body);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}


//delete user
var deleteUser=async (req, res) =>  {
  var id = req.params.id;
  try {
    var deleUser = await userModel.deleteOne({ _id: id })
    res.status(201).json(deleUser);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

// /user/:id/todo
var getTodoOfUser=async (req, res) =>{
  var {id} = req.params;
  try {
    var todo = await todoModel.find({ userId: id });
    res.status(201).json(todo);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
}

async function login(req, res) {
  var { username, password } = req.body;
  var user = await userModel.findOne({ username: username });
  if (user) {
    var valid = bcrypt.compareSync(password, user.password);
    if (valid) {
      var token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
        },
        process.env.SECRET
      );
      res.status(200).send(token);
    } else {
      res.status(401).json({ message: `Invalid username or password` });
    }
  } else {
    res.status(401).end();
  }
}

module.exports = {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  getTodoOfUser,
  login,
};
