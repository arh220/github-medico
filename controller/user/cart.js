const Product = require("../../model/admin/product");
const genericproduct = require("../../model/admin/genericproduct");
const ayurvedicproduct = require("../../model/admin/ayurvedicproduct");

async function getCartProduct(req, res) {
  const productId = req.params.id;
  const product = await Product.findById(productId).lean();
  const genericpro = await genericproduct.findById(productId).lean();
  const ayurvedicpro = await ayurvedicproduct.findById(productId).lean();

  if (!req.session.cart) {
    req.session.cart = [];
  }

  const existingProduct = await req.session.cart.find(p => p._id.toString() === productId);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    if (product) {
      req.session.cart.push({ ...product, quantity: 1 });
    } else if (genericpro) {
      req.session.cart.push({ ...genericpro, quantity: 1 });
    } else if (ayurvedicpro) {
      req.session.cart.push({ ...ayurvedicpro, quantity: 1 });
    }
  }

  res.render("cart", { cart: req.session.cart });
}

async function removeFromCart(req, res) {
  const productId = req.body.productId;

  if (req.session.cart) {
    req.session.cart = req.session.cart.filter(item => item._id.toString() !== productId.toString());
    req.session.save();
  }

  res.json({ success: true });
}

module.exports = { getCartProduct, removeFromCart };
