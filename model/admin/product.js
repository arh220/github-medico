// _____________PRODUCT SCHEMA_______________
const mongoose = require("mongoose");

const addProductSchema = new mongoose.Schema(
  {
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    productimage: {
      type: String,
      required: true,
      default: "./img/product/default.png"
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

const Product = new mongoose.model("product", addProductSchema);

module.exports = Product;
