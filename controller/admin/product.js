const Brand = require("../../model/admin/brand");
const Category = require("../../model/admin/category");
const Product = require("../../model/admin/product");
const { uploadimage, deleteImageFromCloudinary } = require("../../utils/uploadimage");
const fs = require("fs");

async function getAddProductPage(req, res) {
  try {
    const brands = await Brand.find().sort({ brandName: 1 });
    const selectedBrand = req.query.brand || "";
    let categories = [];

    if (selectedBrand) {
      categories = await Category.find({ brand: selectedBrand }).sort({ category: 1 });
    }

    res.render("admin/addproduct", { brands, categories, selectedBrand });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
async function addProduct(req, res) {
  const { brand, category, name, disc, mrp, content, pakingSize, form } = req.body;
  const image = req.file;
  // console.log(req.file);
  const { secure_url, public_id } = await uploadimage(image.path);
  fs.unlinkSync(image.path);
  const products = await Product.create({
    brand,
    category,
    name,
    productimage: secure_url,
    imageId: public_id,
    disc,
    mrp,
    content,
    pakingSize,
    form
  });
  res.render("admin/index", { error: null });
}

async function getAllProduct(req, res) {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = 10;

    const skip = (page - 1) * limit;

    const allproducts = await Product.find()
      .populate("brand")
      .populate("category")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); 

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    res.render("admin/allproduct", {
      allproducts,
      currentPage: page,
      totalPages
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

async function editProduct(req, res) {
  const { name, disc, mrp, content, form, pakingSize } = req.body;
  const productid = req.params.id;
  const newImage = req.file;
  const existproduct = await Product.findById(productid);

  existproduct.name = name;
  existproduct.disc = disc;
  existproduct.mrp = mrp;
  existproduct.content = content;
  existproduct.form = form;
  existproduct.pakingSize = pakingSize;
  if (newImage) {
    await deleteImageFromCloudinary(existproduct.imageId);

    const { secure_url, public_id } = await uploadimage(newImage.path);

    fs.unlinkSync(newImage.path);
    existproduct.productimage = secure_url;
    existproduct.imageId = public_id;
  }
  await existproduct.save();
  return getAllProduct(req, res);
}
async function deleteProduct(req, res) {
  const product = await Product.findById(req.params.id);
  await deleteImageFromCloudinary(product.imageId);
  await Product.findByIdAndDelete(req.params.id);
  return getAllProduct(req, res);
}

module.exports = { getAddProductPage, addProduct, getAllProduct, editProduct, deleteProduct };
