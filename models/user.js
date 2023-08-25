const mongoose = require(`mongoose`);
const bcrypt = require(`bcrypt`);
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlenght: 8,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      minlenght: 3,
      maxlenght: 15,
      required: true,
    },
    lastName: {
      type: String,
      minlenght: 3,
      maxlenght: 15,
      required: true,
    },
  },{
    timestamps: true,
  }
);

userSchema.pre(`save`,async function (next) {
  const salt =await bcrypt.genSalt(10);
  const hashPassword =await bcrypt.hash(this.password, salt);
  this.password = hashPassword;
  next();
});
//   userSchema.pre(`updateOne`,function(next){

//   })
const userModel = mongoose.model(`user`, userSchema);
module.exports = userModel;
