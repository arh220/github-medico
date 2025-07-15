const { cloudinaryConfig } = require("./cloudinary");

const cloudinary = require("cloudinary").v2;

async function uploadimage(imagepath) {
  cloudinaryConfig();
  const result = await cloudinary.uploader.upload(imagepath, { folder: "pharma app" });
  console.log(result);
  //   return result;
}
module.exports = uploadimage;
