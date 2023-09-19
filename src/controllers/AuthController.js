require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const HomePage = (req, res) => {
  res.render("home.ejs");
};
const GetLoginPage = (req, res) => {
  res.render("login.ejs");
};

const GetSignUpPage = (req, res) => {
  res.render("signup.ejs");
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  let errorInfo = {};

  try {
    if (email == null) {
      errorInfo["email"] = "Please fill up email address";
    }
    if (password == null) {
      errorInfo["password"] = "Please input your password";
    }

    if (errorInfo.email !== undefined || errorInfo.password !== undefined) {
      throw Error("EMPTY FIELD");
    }

    const returnAuth = await User.login(email, password);

    //set jwt, cookie
    const token = createJWT(returnAuth._id, returnAuth.name);
    //set cookie
    res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });

    return res.status(200).json({
      status: 200,
      success: true,
      data: returnAuth,
      message: {},
    });
  } catch (err) {
    if (err.message === "INCORRECT EMAIL") {
      errorInfo["email"] = "Incorrect email address";
    } else if (err.message === "INCORRECT PASSWORD") {
      errorInfo["password"] = "Incorrect password";
    }
    return res.status(400).json({
      status: 400,
      success: false,
      data: [],
      message: errorInfo,
    });
  }
};

const CreateUser = async (req, res) => {
  const { name, email, password } = req.body;
  //try create new user
  try {
    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
    });
    //create token
    const token = createJWT(newUser._id, newUser.name);
    //set cookie
    res.cookie("jwt", token, { maxAge: maxAge * 1000, httpOnly: true });
    return res.status(200).json({
      status: 200,
      success: true,
      data: { id: newUser._id, name: newUser.name },
      message: "Create Successfully",
    });
  } catch (err) {
    let errorInfo = {};
    if (typeof err.errors !== "undefined") {
      Object.values(err.errors).forEach(({ properties }) => {
        errorInfo[properties.path] = properties.message;
      });
    }
    if (err.code === 11000) {
      errorInfo["email"] =
        "This email has been registered, please try using an other email";
    }
    return res.status(400).json({
      status: 400,
      success: false,
      data: [],
      message: errorInfo,
    });
  }
};

//handle logout
const LogoutHandle = (req, res) => {
  // res.clearCookie("jwt");
  res.cookie("jwt", "", { maxAge: 1 });
  setTimeout(() => {
    res.redirect("/");
  }, 1000);
};

module.exports = {
  HomePage,
  GetLoginPage,
  GetSignUpPage,
  LoginUser,
  CreateUser,
  LogoutHandle,
};

const maxAge = 1 * 24 * 60 * 60;
const createJWT = (id, name) => {
  return jwt.sign({ id, name }, process.env.KEY, {
    expiresIn: maxAge,
  });
};
