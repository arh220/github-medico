const ayurvedicbrand = require("../../model/admin/ayurvedicbrand");

async function createAyurvedicBrand(req, res) {
  const { brandName } = req.body;
  const trimedname = brandName.trim();
  const existingBrand = await ayurvedicbrand.findOne({ brandName: trimedname });
  if (existingBrand) {
    return res.render("admin/index", { error: "Brand Alredy Exist..." });
  }
  await ayurvedicbrand.create({
    brandName: trimedname
  });
  return res.redirect("/admin/allayurvdcbrd");
}
async function getAllAyurvedicBrands(req, res) {
  const allAyurbrands = await ayurvedicbrand.find();
  res.render("admin/allayurvedicbrand", { allAyurbrands });
}
async function editAyurvedicBrand(req, res) {
  const { brandName } = req.body;
  const trimedname = brandName.trim();
  try {
    const existingBrand = await ayurvedicbrand.findOne({ brandName: trimedname, _id: { $ne: req.params.id } });
    if (existingBrand) {
      return res.render("admin/index", { error: "Brand Name Alredy Exist..." });
    }
    await ayurvedicbrand.findByIdAndUpdate(req.params.id, { brandName: trimedname }, { new: true });
    return getAllAyurvedicBrands(req, res);
  } catch (error) {
    res.send({ error: "Internal server error" });
  }
}
async function deleteAyurvedicBrand(req, res) {
  await ayurvedicbrand.findByIdAndDelete(req.params.id);
  res.redirect("/admin/allayurvdcbrd");
}

module.exports = { createAyurvedicBrand, getAllAyurvedicBrands, editAyurvedicBrand, deleteAyurvedicBrand };
