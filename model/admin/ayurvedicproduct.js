const mongoose = require("mongoose");

const addayurvedicProductSchema = new mongoose.Schema(
  {
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ayurvedicbrand",
      required: true
    },
    catId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ayurvediccat",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    productimage: {
      type: String,
      required: true,
      default: "./img/ayurvedicproimage/default.png"
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

const ayurvedicproduct = new mongoose.model("ayurvedicproduct", addayurvedicProductSchema);

module.exports = ayurvedicproduct;
