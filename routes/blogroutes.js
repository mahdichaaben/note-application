const express = require("express");
const blogcontroler = require("../controllers/blogcontroller");
const Router = express.Router();

Router.get("/", blogcontroler.blog_get);
Router.post("/", blogcontroler.blog_create_post);

Router.get("/create", (req, res) => {
  res.render("create", { title: "create" });
});
Router.get("/about/:id", blogcontroler.blog_details);

Router.patch("/about/:id", blogcontroler.blog_delete);
Router.get("/all", blogcontroler.blog_all_get);
module.exports = Router;
