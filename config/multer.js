var multer = require("multer");
var path = require("path");
const upload = multer({ dest: path.join(__dirname, "public") });
module.exports = upload;
