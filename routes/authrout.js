const {Router}=require("express");
const controller=require("../controllers/control")
const Route=Router();
Route.get("/signup",controller.signup_get)
Route.post("/signup",controller.signup_post)

Route.get("/signin",controller.signin_get)

Route.post("/signin",controller.signin_post)
Route.get("/logout",controller.logout_get)





module.exports=Route;