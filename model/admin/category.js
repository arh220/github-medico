const mongoose = require("mongoose");
const addCategorySchema = new mongoose.Schema(
  {
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
const Category = new mongoose.model("category", addCategorySchema);

module.exports = Category;
