const genericb = require("../../model/admin/genericbrand");

async function createGenericBrand(req, res) {
  const { brandName } = req.body;
  try {
    const trimmedName = brandName.trim();
    const existingBrand = await genericb.findOne({ brandName: trimmedName });
    if (existingBrand) {
      return res.render("admin/index", { error: "brand alredy exist......." });
    }
    await genericb.create({ brandName: trimmedName });
    return res.redirect("/admin/allgenericb");
  } catch (error) {
    console.error("Error creating brand:", error);
    return res.status(500).send("Internal Server Error");
  }
}
async function getAllGenericBrand(req, res) {
  const allgenericb = await genericb.find();
  res.render("admin/allgenericbrand", { allgenericb });
}
async function editGenericBrand(req, res) {
  const { brandName } = req.body;
  const trimmedName = brandName.trim();

  try {
    const existingBrand = await genericb.findOne({
      brandName: trimmedName,
      _id: { $ne: req.params.id }
    });

    if (existingBrand) {
      return res.render("admin/index", { error: "Brand name already exists." });
    }

    await genericb.findByIdAndUpdate(req.params.id, { brandName: trimmedName }, { new: true });

    return getAllGenericBrand(req, res);
  } catch (error) {
    console.error("Error updating brand:", error);
    return res.status(500).send("Internal Server Error");
  }
}
async function deleteGenericBrand(req, res) {
  const brand = await genericb.findByIdAndDelete(req.params.id);
  return getAllGenericBrand(req, res);
}
module.exports = { createGenericBrand, getAllGenericBrand, editGenericBrand, deleteGenericBrand };
