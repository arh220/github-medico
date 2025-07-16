// _____________PRODUCT SCHEMA_______________
const mongoose = require("mongoose");

const addgenericProductSchema = new mongoose.Schema(
  {
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "genericb",
      required: true
    },
    catId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "genericcat",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    productimage: {
      type: String,
      required: true,
      default: "./img/genericproimage/default.png"
    },
    imageId: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    disc: {
      type: String,
      required: true
    },
    form: {
      type: String,
      required: true
    },
    pakingSize: {
      type: String,
      required: true
    },
    mrp: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const product = new mongoose.model("genericproduct", addgenericProductSchema);

module.exports = product;
