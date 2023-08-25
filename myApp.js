const express = require("express");
var app = express();
var cors = require("cors");
var todoRoutes = require(`./routes/todo`);
var userRoutes = require(`./routes/user`);
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/Mearn")
  .then(function () {
    console.log("mongodb connect");
  })
  .catch(function (err) {
    console.log(err);
  });

app.use(express.json());
app.use(cors());

app.use(`/todo`, todoRoutes);
app.use(`/user`, userRoutes);

app.use(`*`, (req, res, next) => {
  res.status(404).json({ message: `sorry API is not found` });
});

app.use((err, req, res, next) => {
  res.status().json({ message: err.message });
});

app.listen(3000, () => {
  console.log(`server listening on port 3333`);
});
