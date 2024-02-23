const User = require("../models/User");
const jwt = require("jsonwebtoken");




// handle errors
const maxAge = 3 * 24 * 60 * 60;
const createtoken = (id) => {
  return jwt.sign({ id }, "mahdich", { expiresIn: maxAge });
};

const handleerrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };
  if (err.message === "incorect email") {
    errors.email = "that email is not registered";
  }
  if (err.message === "incorect password") {
    errors.password = "that password is incorrect";
  }
  if (err.code === 11000) {
    errors.email = "that email is already registered";
  }
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const signup_get = (req, res) => {
  res.render("signup");
};
const signup_post = async (req, res) => {
  let obj = { email: req.body.email, password: req.body.password };
  //  nejem nestaamel hethi : user .save()

  try {
    const user = await User.create(obj);
    const token = createtoken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
    // sucess of new ressource
  } catch (err) {
    const errors = handleerrors(err);
    res.status(400).json({ errors });
  }
};
const signin_get = (req, res) => {
  res.render("signin");
};
const signin_post = async (req, res) => {
  const { email, password } = req.body;
  //    we have to create this method our self  user.signin(email,password) in usermodel static:!!!

  //    ----------------
  try {
    const user = await User.signin(email, password);
    const token = createtoken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleerrors(err);
    res.status(400).json({ errors });
  }
};
const logout_get = async (req, res) => {
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/');
};
module.exports = { signup_get, signin_post, signin_get, signup_post,logout_get,};
