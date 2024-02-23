const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    title: String,

    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blogsdoc", Schema);
module.exports = Blog;
