const express = require("express");
const { signupUser, signinUser } = require("../controller/user");
const router = express.Router();
const multer = require("multer");
const Brand = require("../model/admin/brand");

const { getBrand, getproductByCategory, brandedProductMoredetails } = require("../controller/user/brand");
const { getCartProduct, removeFromCart } = require("../controller/user/cart");
const { getAllGenericBrandAndCategory, getGenericProductByCategory, gpMoredetails } = require("../controller/user/generic");
const { allAyurvedicProduct, ayurvedicProductMoredetails } = require("../controller/user/ayurvedic");
const { checkout, createBill } = require("../controller/user/checkout");
const { requiredAuth } = require("../middleware/auth");

router.get("/", getBrand, getproductByCategory, getAllGenericBrandAndCategory);
router.get("/contact", (req, res) => {
  res.render("contact");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/signin", (req, res) => {
  res.render("signin", { error: null });
});
router.get("/signout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./public/img/profile");
  },
  filename: function(req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post("/signup", upload.single("image"), signupUser);
router.post("/signin", signinUser);

router.get("/product/:id", getproductByCategory);
router.get("/cart/:id", requiredAuth, getCartProduct);
router.post("/cart/remove", removeFromCart);
router.get("/brandmoredetails/:id", brandedProductMoredetails);

router.get("/genericpro/:id", getGenericProductByCategory);
router.get("/gpmoredetails/:id", gpMoredetails);

router.get("/ayurvedicpro/:id", allAyurvedicProduct);
router.get("/ayurmoredetails/:id", ayurvedicProductMoredetails);
router.get("/checkout", checkout);
router.post("/order", createBill);

module.exports = router;
