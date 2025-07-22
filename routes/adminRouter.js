const express = require("express");
const { createBrand, getAllBrand, editBrand, deleteBrand } = require("../controller/admin/brand");
const { getbrand, addCategory, getAllCategory, deleteCategory } = require("../controller/admin/category");
const { getAddProductPage, getAllProduct, editProduct, deleteProduct, addProduct } = require("../controller/admin/product");
const multer = require("multer");
const path = require("path");
const { createGenericBrand, getAllGenericBrand, editGenericBrand, deleteGenericBrand } = require("../controller/admin/generic");
const {
  getGenericCategories,
  createGenericCategory,
  allGenericCategories,
  deleteGenericCategory
} = require("../controller/admin/genericcat");
const {
  getGenericProductPage,
  createGenericProduct,
  getAllGenericProduct,
  editGenericProduct,
  deleteGenericProduct
} = require("../controller/admin/genericproduct");
const {
  createAyurvedicBrand,
  getAllAyurvedicBrands,
  editAyurvedicBrand,
  deleteAyurvedicBrand
} = require("../controller/admin/ayurvedicbrand");
const {
  getAyurvedicCatPage,
  createAyurvedicCategories,
  getAllAyurvedicCategories,
  deleteAyurvedicCategory
} = require("../controller/admin/ayurvediccat");
const {
  getAyurvedicProductPage,
  addAyurvedicProduct,
  getAllAyurvedicProducts,
  editAyurvdicProduct,
  deletAyurvedicProduct
} = require("../controller/admin/ayurvedicproduct");
const { allOrders } = require("../controller/admin/allorders");
const { signinAdmin, signupAdminPage, createsignupAdmin, signoutAdmin } = require("../controller/admin/signin");
const { error } = require("console");
const { adminSignupUser } = require("../middleware/globaldata");
const upload = require("../utils/multer");

const router = express.Router();
router.use(adminSignupUser);
router.use((req, res, next) => {
  if (req.path === "/" || req.path === "/signup" || req.path === "/signin") return next();
  return adminSignupUser(req, res, next);
});
router.get("/", (req, res) => {
  res.render("admin/signin", { error: null });
});
router.get("/index", (req, res) => {
  if (!res.locals.adminuser) {
    res.render("admin/signin", { error: "Please login as admin" });
  }
  res.render("admin/index", { error: null });
});
const adminstorage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, `public/img/adminprofile`);
  },
  filename: function(req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const adminuploads = multer({ storage: adminstorage });

router.post("/signin", signinAdmin);
router.get("/signup", (req, res) => {
  res.render("admin/signup", { error: null });
});
router.post("/signup", adminuploads.single("image"), createsignupAdmin);
router.get("/signout", signoutAdmin);

router.get("/allbrand", getAllBrand);
router.post("/addbrand", createBrand);
router.post("/editbrand/:id", editBrand);
router.get("/deletebrand/:id", deleteBrand);

router.get("/addcategory", getbrand);
router.post("/addcategory", addCategory);
router.get("/allcategory", getAllCategory);
router.get("/deletecategory/:id", deleteCategory);

router.get("/product", getAddProductPage);

router.post("/addproduct", upload.single("productimage"), addProduct);
router.get("/allproduct", getAllProduct);

router.post("/editproduct/:id", upload.single("productimage"), editProduct);
router.get("/deleteproduct/:id", deleteProduct);

router.post("/addgenericbrand", createGenericBrand);
router.get("/allgenericb", getAllGenericBrand);
router.post("/editgenericb/:id", editGenericBrand);
router.get("/deletegenericb/:id", deleteGenericBrand);

router.get("/addgenericcat", getGenericCategories);
router.post("/addgenericcat", createGenericCategory);
router.get("/allgenericcat", allGenericCategories);
router.get("/deletegenericcat/:id", deleteGenericCategory);

router.get("/genericproduct", getGenericProductPage);
router.post("/addgenericproduct", upload.single("productimage"), createGenericProduct);
router.get("/allgenericpro", getAllGenericProduct);
router.post("/editgenericpro/:id", upload.single("productimage"), editGenericProduct);
router.get("/deletegenericpro/:id", deleteGenericProduct);

router.post("/addayurvdcbrand", createAyurvedicBrand);
router.get("/allayurvdcbrd", getAllAyurvedicBrands);
router.post("/editayurvdcbrand/:id", editAyurvedicBrand);
router.get("/deleteayurvdcbrd/:id", deleteAyurvedicBrand);

router.get("/addayurvdccat", getAyurvedicCatPage);
router.post("/addayurvdccat", createAyurvedicCategories);
router.get("/allayurvdccat", getAllAyurvedicCategories);
router.get("/deleteayurvdccat/:id", deleteAyurvedicCategory);

router.get("/ayurvedicpro", getAyurvedicProductPage);
router.post("/addayurvdcpro", upload.single("productimage"), addAyurvedicProduct);
router.get("/allayurvdcpro", getAllAyurvedicProducts);
router.post("/editayurvdcpro/:id", upload.single("productimage"), editAyurvdicProduct);
router.get("/deleteayurvdcpro/:id", deletAyurvedicProduct);

router.get("/allorders", allOrders);
module.exports = router;
