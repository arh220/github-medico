const User = require("../model/user");
const bcrypt = require("bcrypt");
const { createTokenForUser } = require("../services/auth");
const sendMail = require("../utils/sendmail");

async function signupUser(req, res) {
  const { name, email, password, mo, city, dob, gender } = req.body;
  const hashpass = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashpass,
    mo,
    city,
    image: `/img/profile/${req.file?.filename || "default.png"}`,
    dob,
    gender
  });
  await sendMail(email,"welcome to oure website",`Hi, ${name} Thank you for registring! `)

  return res.redirect("/signin");
}

async function signinUser(req, res) {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("signin", { error: "Email not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("signin", { error: "Incorrect password" });
    }

    // If login is successful
    const token = createTokenForUser(user);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    // console.error(error);
    return res.render("signin", { error: "Something went wrong" });
  }
}

module.exports = { signupUser, signinUser };
