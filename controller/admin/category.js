const Brand = require("../../model/admin/brand");
const Category = require("../../model/admin/category");

async function getbrand(req, res) {
  const brands = await Brand.find();
  res.render("admin/addcategory", { brands });
}

async function addCategory(req, res) {
  const { brand, category } = req.body;
  try {
    const existcategory = await Category.findOne({ brand: brand, category: { $regex: new RegExp("^" + category + "$", "i") } });
    if (existcategory) {
      return res.render("admin/index", { error: "Category Alredy Exist" });
    }
    await Category.create({ brand, category });
    return res.redirect("/admin/allcategory");
  } catch (error) {
    console.error("Error creating brand:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function getAllCategory(req, res) {
  const perPage = 10;
  const page = Math.max(1, parseInt(req.query.page) || 1);

  const brandSortOrder = req.query.brandSort === "desc" ? -1 : 1;
  const nextBrandSort = brandSortOrder === 1 ? "desc" : "asc";

  const totalCount = await Category.countDocuments();

  const allcategorys = await Category.find()
    .populate("brand")
    .sort({ "brand.brandName": brandSortOrder, createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage);

  const totalPages = Math.ceil(totalCount / perPage);

  res.render("admin/allcategory", {
    allcategorys,
    currentPage: page,
    totalPages,
    brandSort: req.query.brandSort || "asc",
    nextBrandSort
  });
}

async function deleteCategory(req, res) {
  await Category.findByIdAndDelete(req.params.id);
  const page = Math.max(1, parseInt(req.query.page) || 1);
  return res.redirect(`/admin/allcategory?page=${page}`);
}

module.exports = { getbrand, addCategory, getAllCategory, deleteCategory };
