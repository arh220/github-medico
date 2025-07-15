const cloudinary = require("cloudinary").v2;

async function cloudinaryConfig() {
  try {
    await cloudinary.config({
      cloud_name: "dobvvwnji",
      api_key: "841738377219699",
      api_secret: "o_1iz2qRwyEGIZ1nGwcy2B_OED8"
    });
    console.log("cloudinary configration successfully");
  } catch (error) {
    console.log("error in cloudinary", error);
  }
}
module.exports = { cloudinaryConfig };
