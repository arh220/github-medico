require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");

const path = require("path");
const { error } = require("console");
const { checkForAuthCookie } = require("./middleware/auth");
const { globalData, globalGenericData, globalayurvedicData, adminSignupUser } = require("./middleware/globaldata");

const app = express();
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongoDB connect..."))
  .catch(error => console.log(error));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(globalData, globalGenericData, globalayurvedicData);
app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions"
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  })
);

app.use("/", userRouter);
app.use("/admin", adminSignupUser, adminRouter);

app.listen(PORT, () => {
  console.log("server started...");
});
