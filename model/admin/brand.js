const mongoose = require("mongoose");

// _____________BRAND SCHEMA_______________

const addBrandSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
const Brand = new mongoose.model("brand", addBrandSchema);

module.exports = Brand;
