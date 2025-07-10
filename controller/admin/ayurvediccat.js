const ayurvedicbrand = require("../../model/admin/ayurvedicbrand");
const ayurvediccat = require("../../model/admin/ayurvediccat");

async function getAyurvedicCatPage(req, res) {
  const allAyurbrands = await ayurvedicbrand.find();
  res.render("admin/addayurvediccat", { allAyurbrands });
}
async function createAyurvedicCategories(req, res) {
  const { brandId, catName } = req.body;
  const existcat = await ayurvediccat.findOne({ brandId: brandId, catName: { $in: req.body.catName } });
  if (existcat) {
    return res.render("admin/index", { error: "Category Allredy Exist..." });
  }
  await ayurvediccat.create({ brandId, catName });
  return res.redirect("/admin/allayurvdccat");
}
async function getAllAyurvedicCategories(req, res) {
  const allayurvdccat = await ayurvediccat.find().populate("brandId");
  return res.render("admin/allayurvediccat", { allayurvdccat });
}
async function deleteAyurvedicCategory(req, res) {
  await ayurvediccat.findByIdAndDelete(req.params.id);
  return getAllAyurvedicCategories(req, res);
}

module.exports = { getAyurvedicCatPage, createAyurvedicCategories, getAllAyurvedicCategories, deleteAyurvedicCategory };
