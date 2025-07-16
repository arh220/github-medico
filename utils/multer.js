const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",

  filename: function(req, file, cb) {
    // console.log(file);
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });
module.exports = upload;
