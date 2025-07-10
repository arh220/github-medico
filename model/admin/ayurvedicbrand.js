const mongoose = require("mongoose");

const addAyurvedicBrandSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
const ayurvedicbrand = new mongoose.model("ayurvedicbrand", addAyurvedicBrandSchema);

module.exports = ayurvedicbrand;
