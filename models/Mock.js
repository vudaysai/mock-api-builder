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
  subPath: String,
  query: mongoose.Schema.Types.Mixed,
  requestBody: mongoose.Schema.Types.Mixed,
  returnData: mongoose.Schema.Types.Mixed,
  appId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'App',
    required: true
  }
});

module.exports = mongoose.model("Mock", MockSchema);
