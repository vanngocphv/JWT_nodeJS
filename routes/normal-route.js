const express = require("express");

const AuthController = require("../src/controllers/AuthController");
const AuthMiddleware = require("../src/middlewares/AuthMiddleware");

const router = express.Router();

//home page
router.get("/home", AuthMiddleware.authVerifyUser, AuthController.HomePage);

//login page
router.get("/login", AuthMiddleware.isUserLogin, AuthController.GetLoginPage);

router.get("/signup", AuthMiddleware.isUserLogin, AuthController.GetSignUpPage);

router.post("/login", AuthMiddleware.isUserLogin, AuthController.LoginUser);

router.post("/signup", AuthMiddleware.isUserLogin, AuthController.CreateUser);

//logout page
router.get(
  "/logout",
  AuthMiddleware.authVerifyUser,
  AuthController.LogoutHandle
);

module.exports = router;
