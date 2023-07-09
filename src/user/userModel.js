const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  // deleteAt: {
  //   default: null,
  //   type: Date,
  // },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
