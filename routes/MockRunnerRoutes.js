const express = require("express");
const router = express.Router();
const Mock = require("../models/Mock");

// Get all mocked APIs created
router.get("/:mockName", async (req, res) => {
  try {
    const mock = await Mock.findOne({ name: req.params.mockName, method: 'GET' });
    if (mock == null) {
      return res.status(404).json({ message: "Cant find Mock" });
    }
    res.json(mock.returnData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:mockName", async (req, res) => {
  try {
    const mock = await Mock.findOne({ name: req.params.mockName, method: 'POST' });
    if (mock == null) {
      return res.status(404).json({ message: "Cant find Mock" });
    }
    res.json(mock.returnData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
