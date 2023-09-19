const viewConfig = require("./src/configs/viewConfig");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const normalRouter = require("./routes/normal-route");
const AuthMiddleware = require("./src/middlewares/AuthMiddleware");
const app = express();
const PORT = process.env.PORT || 4000;

//set static folder
viewConfig(app);

//setting and connect to mongoose
const uri = "mongodb://127.0.0.1:27017/JWT-Auth";
mongoose
  .connect(uri)
  .then((result) =>
    app.listen(PORT, () => {
      console.log("A new website has been listened on port 4000...");
    })
  )
  .catch((err) => console.log(err));

//body parse
//parse value from request post into body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get("*", AuthMiddleware.checkUserInfo);

//index, home page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

//need, required page
app.get("/recipe", AuthMiddleware.authVerifyUser, (req, res) => {
  res.render("recipe.ejs");
});

//routes action
app.use("/", normalRouter);
