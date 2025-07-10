const mongoose = require("mongoose");
const addAyurvedicCategorySchema = new mongoose.Schema(
  {
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ayurvedicbrand",
      required: true
    },
    catName: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
const ayurvediccat = new mongoose.model("ayurvediccat", addAyurvedicCategorySchema);

module.exports = ayurvediccat;
