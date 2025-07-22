const ayurvedicbrand = require("../../model/admin/ayurvedicbrand");
const ayurvediccat = require("../../model/admin/ayurvediccat");
const ayurvedicproduct = require("../../model/admin/ayurvedicproduct");
const { uploadimage, deleteImageFromCloudinary } = require("../../utils/uploadimage");
const fs = require("fs");

async function getAyurvedicProductPage(req, res) {
  const allAyurvediBrands = await ayurvedicbrand.find().sort({ brandName: 1 });
  const selectedBrand = req.query.brandid;
  let allAyurvedicCategories = [];

  if (selectedBrand) {
    allAyurvedicCategories = await ayurvediccat.find({ brandId: selectedBrand }).sort({ catName: 1 });
  }

  return res.render("admin/addayurvedicproduct", { allAyurvediBrands, allAyurvedicCategories, selectedBrand });
}
async function addAyurvedicProduct(req, res) {
  const { brandId, catId, name, disc, mrp, pakingSize, form } = req.body;
  const image = req.file;
  // console.log(req.file);
  const { secure_url, public_id } = await uploadimage(image.path);
  fs.unlinkSync(image.path);
  await ayurvedicproduct.create({
    brandId,
    catId,
    name,
    productimage: secure_url,
    imageId: public_id,
    disc,
    mrp,
    pakingSize,
    form
  });
  return res.redirect("/admin/allayurvdcpro");
}
async function getAllAyurvedicProducts(req, res) {
  const allAyurvediProducts = await ayurvedicproduct
    .find()
    .populate("brandId")
    .populate("catId");
  return res.render("admin/allayurvedicproduct", { allAyurvediProducts });
}
async function editAyurvdicProduct(req, res) {
  const productId = req.params.id;

  const { name, disc, mrp, form, pakingSize } = req.body;
  const newimage = req.file;
  const selectedproduct = await ayurvedicproduct.findById(productId);
  (selectedproduct.name = name), (selectedproduct.disc = disc), (selectedproduct.mrp = mrp);
  selectedproduct.form = form;
  selectedproduct.pakingSize = pakingSize;
  if (newimage) {
    await deleteImageFromCloudinary(selectedproduct.imageId);
    const { secure_url, public_id } = await uploadimage(newimage.path);
    fs.unlinkSync(newimage.path);
    selectedproduct.productimage = secure_url;
    selectedproduct.imageId = public_id;
  }
  await selectedproduct.save();
  return getAllAyurvedicProducts(req, res);
}
async function deletAyurvedicProduct(req, res) {
  const delimage = await ayurvedicproduct.findById(req.params.id);
  await deleteImageFromCloudinary(delimage.imageId);
  await ayurvedicproduct.findByIdAndDelete(req.params.id);
  return getAllAyurvedicProducts(req, res);
}
module.exports = {
  getAyurvedicProductPage,
  addAyurvedicProduct,
  getAllAyurvedicProducts,
  editAyurvdicProduct,
  deletAyurvedicProduct
};
