const mongoose = require("mongoose");

const genericCatSchema = mongoose.Schema(
  {
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "genericb",
      required: true
    },
    catName: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const genericcat = mongoose.model("genericcat", genericCatSchema);
module.exports = genericcat;
