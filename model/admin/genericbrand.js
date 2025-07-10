const mongoose = require("mongoose");

const genericSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
const genericb = mongoose.model("genericb", genericSchema);
module.exports = genericb;
