const order = require("../../model/order");
const sendMail = require("../../utils/sendmail");

async function checkout(req, res) {
  const cart = req.session.cart || [];
  res.render("checkout", { cart });
}

async function createBill(req, res) {
  const { name, addre, city, pincode, mo, email, cart, subtotal, shipping, grandTotal } = req.body;

  try {
    if (!cart || cart.trim() === "") {
      return res.status(400).send("Cart data is missing");
    }

    const rawCart = JSON.parse(cart);

    const cartItems = rawCart.map(item => ({
      productId: item._id,
      name: item.name,
      quantity: item.qty,
      price: item.price,
      total: item.qty * item.price
    }));

    const Order = new order({
      name,
      addre,
      city,
      pincode,
      mo,
      email,
      cartItems,
      subtotal: parseFloat(subtotal),
      shipping: parseFloat(shipping),
      grandTotal: parseFloat(grandTotal)
    });

    await Order.save();
    await sendMail(email, "Order Conform", `Hi, ${name} Thanks For Youre Order `);
    req.session.cart = [];
    res.render("thanks", { order: Order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { checkout, createBill };
