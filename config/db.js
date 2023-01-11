const mongoose = require("mongoose");

mongoose.connect(process.env.DB_HOST, function () {
  console.log("Connected to MongoDB");
});
