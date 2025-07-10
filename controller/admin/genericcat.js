const genericb = require("../../model/admin/genericbrand");
const genericcat = require("../../model/admin/genericcat");

async function getGenericCategories(req, res) {
  const allbrands = await genericb.find();
  res.render("admin/addgenericcat", { allbrands });
}
async function createGenericCategory(req, res) {
  const { brandId, catName } = req.body;
  try {
    const existcategory = await genericcat.findOne({
      brandId: brandId,
      catName: { $regex: new RegExp("^" + catName.trim() + "$", "i") }
    });
    if (existcategory) {
      return res.render("admin/index", { error: "Category allredy exist...." });
    }
    await genericcat.create({ brandId, catName: catName.trim() });
    return res.redirect("/admin/allgenericcat");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
async function allGenericCategories(req, res) {
  const allgenericcat = await genericcat.find().populate("brandId");
  res.render("admin/allgenericcat", { allgenericcat });
}
async function deleteGenericCategory(req, res) {
  await genericcat.findByIdAndDelete(req.params.id);
  return allGenericCategories(req, res);
}
module.exports = { getGenericCategories, createGenericCategory, allGenericCategories, deleteGenericCategory };
