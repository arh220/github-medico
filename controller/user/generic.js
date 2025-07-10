const genericb = require("../../model/admin/genericbrand");
const genericcat = require("../../model/admin/genericcat");
const genericproduct = require("../../model/admin/genericproduct");

async function getAllGenericBrandAndCategory(req, res) {
  const allgenericbrands = await genericb.find();
  const allgenericcategories = await genericcat.find().populate("brandId");

  return res.render("home", { allgenericbrands, allgenericcategories });
}
async function getGenericProductByCategory(req, res) {
  const categoryId = req.params.id;
  const selectedCategory = await genericcat.findById(categoryId).populate("brandId");
  if (!selectedCategory) {
    res.redirect("/");
  }
  const selectedBrand = selectedCategory.brandId;
  const categoriesOfBrand = await genericcat.find({ brandId: selectedBrand._id });

  const categoryIds = categoriesOfBrand.map(cat => cat._id);
  const allproducts = await genericproduct.find({ catId: { $in: categoryIds } }).populate("catId");

  const genericbrands = await genericb.find();
  const genericcate = await genericcat.find().populate("brandId");

  res.render("genericpro", { selectedBrand, categoriesOfBrand, allproducts, genericbrands, genericcate });
}
async function gpMoredetails(req, res) {
  const productId = req.params.id;
  const products = await genericproduct
    .findById(productId)
    .populate("brandId")
    .populate("catId");
  res.render("moredetailsgp", { products });
}

module.exports = { getAllGenericBrandAndCategory, getGenericProductByCategory, gpMoredetails };
