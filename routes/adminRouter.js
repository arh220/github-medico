const express = require("express");
const { createBrand, getAllBrand, editBrand, deleteBrand } = require("../controller/admin/brand");
const { getbrand, addCategory, getAllCategory, deleteCategory } = require("../controller/admin/category");
const { getAddProductPage, addProduct, getAllProduct, editProduct, deleteProduct } = require("../controller/admin/product");
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
const { signinAdmin, signupAdminPage, createsignupAdmin } = require("../controller/admin/signin");
const { error } = require("console");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("admin/signin", { error: null });
});
router.get("/index", (req, res) => {
  res.render("admin/index", { error: null, adminuser: req.session.admin });
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
router.post("/signup", adminuploads.single("image"), createsignupAdmin);

router.get("/allbrand", getAllBrand);
router.post("/addbrand", createBrand);
router.post("/editbrand/:id", editBrand);
router.get("/deletebrand/:id", deleteBrand);

router.get("/addcategory", getbrand);
router.post("/addcategory", addCategory);
router.get("/allcategory", getAllCategory);
router.get("/deletecategory/:id", deleteCategory);

router.get("/product", getAddProductPage);

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "public/img/product");
  },
  filename: function(req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });
router.post("/addproduct", upload.single("productimage"), addProduct);
router.get("/allproduct", getAllProduct);

const storage1 = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `public/img,product`);
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const uploads = multer({ storage });
router.post("/editproduct/:id", uploads.single("productimage"), editProduct);
router.get("/deleteproduct/:id", deleteProduct);

router.post("/addgenericbrand", createGenericBrand);
router.get("/allgenericb", getAllGenericBrand);
router.post("/editgenericb/:id", editGenericBrand);
router.get("/deletegenericb/:id", deleteGenericBrand);

router.get("/addgenericcat", getGenericCategories);
router.post("/addgenericcat", createGenericCategory);
router.get("/allgenericcat", allGenericCategories);
router.get("/deletegenericcat/:id", deleteGenericCategory);

const storage3 = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, `public/img/genericproimage`);
  },
  filename: function(req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const uploadimg = multer({ storage: storage3 });

router.get("/genericproduct", getGenericProductPage);
router.post("/addgenericproduct", uploadimg.single("productimage"), createGenericProduct);
router.get("/allgenericpro", getAllGenericProduct);

const editstorage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, `public/img/genericproimage`);
  },
  filename: function(req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const edituploads = multer({ storage: editstorage });
router.post("/editgenericpro/:id", edituploads.single("productimage"), editGenericProduct);
router.get("/deletegenericpro/:id", deleteGenericProduct);

router.post("/addayurvdcbrand", createAyurvedicBrand);
router.get("/allayurvdcbrd", getAllAyurvedicBrands);
router.post("/editayurvdcbrand/:id", editAyurvedicBrand);
router.get("/deleteayurvdcbrd/:id", deleteAyurvedicBrand);

router.get("/addayurvdccat", getAyurvedicCatPage);
router.post("/addayurvdccat", createAyurvedicCategories);
router.get("/allayurvdccat", getAllAyurvedicCategories);
router.get("/deleteayurvdccat/:id", deleteAyurvedicCategory);

const ayurStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, `public/img/ayurvedicproimage`);
  },
  filename: function(req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const ayuuploads = multer({ storage: ayurStorage });

const editayustorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `public/img/ayurvedicproimage`);
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const editayuruploads = multer({ storage: editayustorage });
router.get("/ayurvedicpro", getAyurvedicProductPage);
router.post("/addayurvdcpro", ayuuploads.single("productimage"), addAyurvedicProduct);
router.get("/allayurvdcpro", getAllAyurvedicProducts);
router.post("/editayurvdcpro/:id", editayuruploads.single("productimage"), editAyurvdicProduct);
router.get("/deleteayurvdcpro/:id", deletAyurvedicProduct);

router.get("/allorders", allOrders);
module.exports = router;
