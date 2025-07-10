const jwt = require("jsonwebtoken");
const User = require("../model/user");

secretKey = "@arh123+";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    image: user.image,
    role: user.role
  };
  const token = jwt.sign(payload, secretKey);
  return token;
}
function validateToken(token) {
  const payload = jwt.verify(token, secretKey);
  return payload;
}
module.exports = { createTokenForUser, validateToken };
