//blog_index,blog_details,blog_create_get,blog_create_post,blog_delete
const User = require("../models/User");
const Blog = require("../models/blog");
const blog_get = async function (req, res) {
  try {
    const user = await User.findById(res.locals.user._id);
    res.status(200).render("blogs", { blog: user.blogs });
  } catch (err) {
    res.status(400).send("server ereuur");
  }
};
const blog_create_post = async function (req, res, next) {
  const obj = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
  });
  try {
    await User.findOneAndUpdate(
      { _id: res.locals.user._id },
      { $push: { blogs: obj } },
      {
        new: true,
        upsert: true,
        rawResult: true, // Return the raw result from the MongoDB driver
      }
    );
    res.status(201).redirect("/");
  } catch (err) {
    console.log(err);
    res.status(400).redirect("/signin");
  }
};

const blog_details = async function (req, res) {
  const id = req.params.id;
  try {
    const user = await User.findById(res.locals.user._id);
    const r = user.blogs.find((e) => e._id == id);
    res.status(200).render("details", { title: "blog details", b: r });
  } catch (err) {
    console.log(err);
  }
};
const blog_delete = async function (req, res) {
  const id = req.params.id;
  const r = res.locals.user.blogs.find((e) => e._id == id);
  try {
    await User.findOneAndUpdate(
      { _id: res.locals.user._id },
      { $pull: { blogs: r } },
     
      
    ) 
    res.status(201).json({redirect:"/"});
  } catch (err) {
    res.status(400).redirect("/");
  }
}
  // Blog.findByIdAndDelete(id)

const blog_all_get = (req, res) => {
  User.findById(res.locals.user._id)
    .then((r) => res.send(r.blogs))
    .catch((err) => console.log(err));
};

module.exports = {
  blog_get,
  blog_details,
  blog_delete,
  blog_create_post,
  blog_all_get,
};
