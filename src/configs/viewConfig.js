const express = require("express");

const viewConfig = (app) => {
  app.use(express.static("./public"));

  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};

module.exports = viewConfig;
