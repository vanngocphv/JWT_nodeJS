const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// valid/verify user if this true login
const authVerifyUser = (req, res, next) => {
  // get token value
  const token = req.cookies.jwt;

  if (token) {
    //handle check if the token is valid
    jwt.verify(token, process.env.KEY, (err, decodedToken) => {
      if (err) {
        //handle when error as save log line
        return res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    //redirect to login page
    return res.redirect("/login");
  }
};

const checkUserInfo = (req, res, next) => {
  const token = req.cookies.jwt; // get token from jwt

  if (token) {
    // verify token
    jwt.verify(token, process.env.KEY, async (err, decodedToken) => {
      if (err) {
        // dont set anything, just run next
        res.locals.user = null;
        next();
      } else {
        // set something which will identify user information
        const user = await User.findById(decodedToken.id);
        res.locals.user = {
          id: decodedToken.id,
          name: user.name,
          email: user.email,
        };
        next();
      }
    });
  } else {
    //if no token, dont set anything
    res.locals.user = null;
    next();
  }
};

const isUserLogin = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.KEY, (err, decodedValue) => {
      if (err) {
        //user with invalid token, next for login or regis
        next();
      } else {
        //user has login, cannot run next()
        res.redirect("back");
      }
    });
  } else {
    //user doesn't have token, just next function
    next();
  }
};

module.exports = {
  authVerifyUser,
  checkUserInfo,
  isUserLogin,
};
