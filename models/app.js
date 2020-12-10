const mongoose = require("mongoose");

const AppSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("App", AppSchema);
