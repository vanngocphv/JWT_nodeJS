const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name field is not empty, its required"],
  },
  email: {
    type: String,
    required: [true, "The email field is not empty, its required"],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /\S+@\S+\.\S+/.test(value);
      },
      message: (prop) => {
        return `${prop.value} is not a valid email!`;
      },
    },
  },
  password: {
    type: String,
    length: 255,
    required: [true, "The password field is not empty, its required"],
    minLength: [6, "The password has minimum length is 6"],
  },
});

// Hook event
User.pre("save", async function (next) {
  //get current user save password
  //gen bcrypt salt
  const salt = await bcrypt.genSalt();

  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Custom function
User.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (!user) {
    throw Error("INCORRECT EMAIL");
  } else {
    //compare password
    const auth = await bcrypt.compare(password, user.password);
    //if matching data
    if (auth) {
      return user;
    } else {
      throw Error("INCORRECT PASSWORD");
    }
  }
};

module.exports = mongoose.model("user", User);
