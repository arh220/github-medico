const cloudinary = require("cloudinary").v2;

async function uploadimage(imagepath) {
  const result = await cloudinary.uploader.upload(imagepath, { folder: "pharma app" });
  // console.log(result);
  return result;
}
async function deleteImageFromCloudinary(imageId) {
  await cloudinary.uploader.destroy(imageId);
}
module.exports = { uploadimage, deleteImageFromCloudinary };
