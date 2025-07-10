const Brand = require("../../model/admin/brand");

// Create Brand Controller
async function createBrand(req, res) {
  const { brandName } = req.body;

  try {
    const trimmedName = brandName.trim();

    const existingBrand = await Brand.findOne({ brandName: trimmedName });

    if (existingBrand) {
      return res.render("admin/index", { error: "Brand Already Exist" });
    }

    const newBrand = new Brand({ brandName: trimmedName });
    await newBrand.save();

    return res.redirect("/admin/allbrand");
  } catch (error) {
    console.error("Error creating brand:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function getAllBrand(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const [brands, totalCount] = await Promise.all([
      Brand.find()
        .skip(skip)
        .limit(limit),
      Brand.countDocuments()
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return res.render("admin/allbrand", {
      brands,
      currentPage: page,
      totalPages,
      error: null
    });
  } catch (error) {
    console.error("Error loading brands:", error);
    return res.render("admin/allbrand", {
      brands: [],
      currentPage: 1,
      totalPages: 1,
      error: "Error loading brands"
    });
  }
}
// update Brand Controller

async function editBrand(req, res) {
  // console.log("hello");
  try {
    const { brandName } = req.body;
    const trimmedName = brandName.trim();

    const brands = await Brand.findByIdAndUpdate(req.params.id, { brandName: trimmedName }, { new: true });

    if (!brands) {
      return res.status(404).send("Brand not found");
    }

    return getAllBrand(req, res);
  } catch (error) {
    console.error("Error updating brand:", error);
    return res.status(500).send("Internal server error");
  }
}

async function deleteBrand(req, res) {
  const brands = await Brand.findByIdAndDelete(req.params.id);
  if (!brands) {
    return res.render("admin/allbrand", { error: "Brand not Delete..." });
  }
  return getAllBrand(req, res);
}

module.exports = { createBrand, getAllBrand, editBrand, deleteBrand };
