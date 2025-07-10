const order = require("../../model/order");

async function allOrders(req, res) {
  const allOrders = await order.find().sort({ createdAt: -1 });
  res.render("admin/allorders", { allOrders });
}
module.exports = { allOrders };
