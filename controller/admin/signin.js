const user = require("../../model/user");
const bcrypt = require("bcrypt");

async function signinAdmin(req, res) {
  const { email } = req.body;

  const adminuser = await user.findOne({ email, role: "ADMIN" });

  if (!adminuser) {
    return res.render("admin/signin", { error: "You Are not Authorized..." });
  }
  req.session.admin = adminuser;
  return res.redirect("/admin/index");
}

async function createsignupAdmin(req, res) {
  const { name, email, password, role, mo, city, dob, gender } = req.body;
  const existemail = await user.findOne({ email });
  if (existemail) {
    res.render("admin/signup", { error: "Email Alredy Exist..." });
  }
  const hashpass = await bcrypt.hash(password, 10);
  const adduser = await user.create({
    name,
    email,
    password: hashpass,
    role,
    mo,
    city,
    dob,
    gender,
    image: `/img/adminprofile/${req.file?.filename || "default.png"} `
  });
  res.render("admin/index", { error: null });
}
async function signoutAdmin(req, res) {
  req.session.destroy(err => {
    if (err) {
      console.log("Logout error:", err);
    }
    res.redirect("/admin");
  });
}

module.exports = { signinAdmin, createsignupAdmin, signoutAdmin };
