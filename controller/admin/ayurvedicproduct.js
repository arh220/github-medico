const ayurvedicbrand = require("../../model/admin/ayurvedicbrand");
const ayurvediccat = require("../../model/admin/ayurvediccat");
const ayurvedicproduct = require("../../model/admin/ayurvedicproduct");

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
  await ayurvedicproduct.create({
    brandId,
    catId,
    name,
    productimage: `/img/ayurvedicproimage/${req.file.filename || "default.png"}`,
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
  const selectedproduct = await ayurvedicproduct.findById(productId);
  (selectedproduct.name = name), (selectedproduct.disc = disc), (selectedproduct.mrp = mrp);
  selectedproduct.form = form;
  selectedproduct.pakingSize = pakingSize;
  if (req.file) {
    selectedproduct.productimage = `/img/ayurvedicproimage/${req.file.filename}`;
  }
  await selectedproduct.save();
  return getAllAyurvedicProducts(req, res);
}
async function deletAyurvedicProduct(req, res) {
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
