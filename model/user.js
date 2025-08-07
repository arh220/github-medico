const mongoose = require("mongoose");
const userSignupSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    mo: {
      type: Number,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: "./img/profile/default.png",
      required: true
    },
    imageId: {
      type: String,
      required: true
    },
    dob: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSignupSchema);
module.exports = User;
