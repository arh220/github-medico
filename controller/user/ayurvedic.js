const ayurvedicbrand = require("../../model/admin/ayurvedicbrand");
const ayurvediccat = require("../../model/admin/ayurvediccat");
const ayurvedicproduct = require("../../model/admin/ayurvedicproduct");

async function getAyurvedicBrands(req, res) {
  const allAyurvedicbrands = await ayurvedicbrand.find();
  const allAyurvediccategories = await ayurvediccat.find().populate("brandId");
  return res.render("home", { allAyurvedicbrands, allAyurvediccategories });
}
async function allAyurvedicProduct(req, res) {
  const catId = req.params.id;
  const selectedCategory = await ayurvediccat.findById(catId).populate("brandId");
  const selectBrand = selectedCategory.brandId;
  const categoriesOfBrand = await ayurvediccat.find({ brandId: selectBrand._id });
  const categoryIds = categoriesOfBrand.map(cat => cat._id);
  const allproducts = await ayurvedicproduct
    .find({ catId: { $in: categoryIds } })
    .populate("brandId")
    .populate("catId");
  res.render("ayurvedicpro", { categoriesOfBrand, allproducts });
}
async function ayurvedicProductMoredetails(req, res) {
  const products = await ayurvedicproduct
    .findById(req.params.id)
    .populate("brandId")
    .populate("catId");
  res.render("moredetailsgp", { products });
}
module.exports = { getAyurvedicBrands, allAyurvedicProduct, ayurvedicProductMoredetails };
