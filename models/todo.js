const mongoose = require(`mongoose`);
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlenght: 5,
      maxlenght: 20,
      required: true,
    },
    status: {
      type: String,
      default: `to-do`,
      enum: [`to-do`, `in progress`, `done`],
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: `user`,
    },
  },
  {
    timestamps: true,
  }
);
const todoModel = mongoose.model(`todo`, todoSchema);
module.exports = todoModel;
// {"title":"todo","status":"in progress","userId":"64ce35fb9f0f654b7f57d436"}
