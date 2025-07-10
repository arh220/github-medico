const Product = require("../../model/admin/product");
const Brand = require("../../model/admin/brand");
const Category = require("../../model/admin/category");

async function getBrand(req, res) {
  const brands = await Brand.find();
  categories = await Category.find().populate("brand");

  return res.render("home", { brands, categories });
}
async function getproductByCategory(req, res) {
  const catid = req.params.id;

  const selectedCategory = await Category.findById(catid).populate("brand");

  if (!selectedCategory) {
    return res.redirect("/");
  }

  const selectedBrand = selectedCategory.brand;

  const categoriesOfBrand = await Category.find({ brand: selectedBrand._id });

  const categoryIds = categoriesOfBrand.map(cat => cat._id);

  const products = await Product.find({ category: { $in: categoryIds } })
    .populate("category")
    .populate("brand");

  const brands = await Brand.find();
  const categories = await Category.find().populate("brand");

  res.render("product", {
    allproduct: products,
    brands,
    categories,
    selectedBrand,
    categoriesOfBrand
  });
}
async function brandedProductMoredetails(req, res) {
  const products = await Product.findById(req.params.id)
    .populate("brand")
    .populate("category");
  res.render("moredetailsbrand", { products });
}

module.exports = { getBrand, getproductByCategory, brandedProductMoredetails };
