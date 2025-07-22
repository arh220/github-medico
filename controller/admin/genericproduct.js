const genericb = require("../../model/admin/genericbrand");
const genericcat = require("../../model/admin/genericcat");
const genericproduct = require("../../model/admin/genericproduct");
const { uploadimage, deleteImageFromCloudinary } = require("../../utils/uploadimage");
const fs = require("fs");

async function getGenericProductPage(req, res) {
  try {
    const allgenericbrands = await genericb.find().sort({ brandName: 1 });
    const selectedBrand = req.query.brandid;
    let categories = [];
    if (selectedBrand) {
      categories = await genericcat.find({ brandId: selectedBrand }).sort({ catName: 1 });
    }
    res.render("admin/addgenericproduct", { allgenericbrands, categories, selectedBrand });
  } catch (error) {
    res.status(500).send("Server error");
  }
}
async function createGenericProduct(req, res) {
  const { brandId, catId, name, disc, mrp, content, pakingSize, form } = req.body;
  const image = req.file;
  const { secure_url, public_id } = await uploadimage(image.path);

  fs.unlinkSync(image.path);
  await genericproduct.create({
    brandId,
    catId,
    name,
    productimage: secure_url,
    imageId: public_id,
    disc,
    mrp,
    content,
    pakingSize,
    form
  });
  return res.redirect("/admin/allgenericpro");
}
async function getAllGenericProduct(req, res) {
  const allproducts = await genericproduct
    .find()
    .populate("brandId")
    .populate("catId");
  res.render("admin/allgenericpro", { allproducts });
}
async function editGenericProduct(req, res) {
  const productid = req.params.id;
  const { name, disc, mrp, content, form, pakingSize } = req.body;
  const editimage = req.file;
  // console.log(editimage);

  // console.log(url);
  const existproduct = await genericproduct.findById(productid);
  existproduct.name = name;
  existproduct.disc = disc;
  existproduct.mrp = mrp;
  existproduct.content = content;
  existproduct.form = form;
  existproduct.pakingSize = pakingSize;
  if (editimage) {
    await deleteImageFromCloudinary(existproduct.imageId);
    const { secure_url, public_id } = await uploadimage(editimage.path);
    fs.unlinkSync(editimage.path);

    existproduct.productimage = secure_url;
    existproduct.imageId = public_id;
  }
  await existproduct.save();
  return getAllGenericProduct(req, res);
}
async function deleteGenericProduct(req, res) {
  const gproduct = await genericproduct.findById(req.params.id);
  await deleteImageFromCloudinary(gproduct.imageId);
  await genericproduct.findByIdAndDelete(req.params.id);

  return getAllGenericProduct(req, res);
}

module.exports = {
  getGenericProductPage,
  createGenericProduct,
  getAllGenericProduct,
  editGenericProduct,
  deleteGenericProduct
};
