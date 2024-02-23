const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String},

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
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter valid email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "please enter valid email "],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    minlength: [6, "min password 6 characters"],
  },
  image:
  {
      data: Buffer,
      contentType: String
  },blogs:[blogSchema] 
});
// mongoose midlewara or hook (after the save event )
userSchema.post("save", (doc, next) => {
  console.log("new user was created and saved", doc);
  next();
});

// static method to login user
userSchema.statics.signin = async function (email, password) {
  const user = await this.findOne({ email: email }); //or {email} cle w valeur fard esm
  try {
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      } else {
        throw new Error("incorect password");
      }
    } else {
      throw new Error("incorect email");
    }
  } finally {
  }
};

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log("user about to be created and saved", this);
  next();
});
const User = mongoose.model("users", userSchema);
module.exports = User;
