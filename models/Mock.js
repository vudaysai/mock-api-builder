const mongoose = require("mongoose");

const MockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  requestBody: mongoose.Schema.Types.Mixed,
  returnData: mongoose.Schema.Types.Mixed

});

module.exports = mongoose.model("Mock", MockSchema);

// name should be unique and indexed