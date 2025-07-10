const Brand = require("../model/admin/brand");
const Category = require("../model/admin/category");
const genericb = require("../model/admin/genericbrand");
const genericcat = require("../model/admin/genericcat");
const genericproduct = require("../model/admin/genericproduct");
const Product = require("../model/admin/product");
const ayurvedicbrand = require("../model/admin/ayurvedicbrand");
const ayurvediccat = require("../model/admin/ayurvediccat");
const ayurvedicproduct = require("../model/admin/ayurvedicproduct");

async function globalData(req, res, next) {
  const brands = await Brand.find();
  const categories = await Category.find().populate("brand");
  const allproduct = await Product.find()
    .populate("brand")
    .populate("category");

  res.locals.allbrands = brands;
  res.locals.categories = categories;
  res.locals.allproducts = allproduct;
  res.locals.user = req.user;

  next();
}
async function globalGenericData(req, res, next) {
  const genericbrands = await genericb.find();
  const genericcategories = await genericcat.find().populate("brandId");
  const genericallproduct = await genericproduct
    .find()
    .populate("brandId")
    .populate("catId");

  res.locals.allgenericbrands = genericbrands;
  res.locals.allgenericcategories = genericcategories;
  res.locals.allgenericproducts = genericallproduct;

  next();
}
async function globalayurvedicData(req, res, next) {
  const ayurvedicBrands = await ayurvedicbrand.find();
  const ayurvedicCategories = await ayurvediccat.find().populate("brandId");
  const ayurvedicProducts = await ayurvedicproduct
    .find()
    .populate("brandId")
    .populate("catId");

  res.locals.allAyurvedicbrands = ayurvedicBrands;
  res.locals.allAyurvediccategories = ayurvedicCategories;
  res.locals.allAyurvedicproducts = ayurvedicProducts;

  next();
}
async function adminSignupUser(req, res, next) {
  if (req.session && req.session.adminuser) {
    const adminuser = await user.findById(req.session.adminuser._id);
    res.locals.adminuser = adminuser;
  } else {
    res.locals.adminuser = null;
  }
  next();
}

module.exports = { globalData, globalGenericData, globalayurvedicData, adminSignupUser };
