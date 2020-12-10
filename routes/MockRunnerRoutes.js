const express = require("express");
const multer = require('multer');
const upload = multer();

const router = express.Router({ mergeParams: true });
const Mock = require("../models/Mock");

// mocked Get API
router.get("/:mockName", async (req, res) => {
  console.log(req.query, 'req')
  try {
    const mock = await Mock.findOne({ name: req.params.mockName, method: 'GET' }).lean();
    if (mock == null) {
      return res.status(404).json({ message: "Cant find Mock" });
    }
    if (mock.query) {
      let compare = JSON.stringify(mock.query) === JSON.stringify(req.query)
      if (!compare) {
        return res.status(400).json({ message: "query miss-match" });
      }
    }
    res.send(mock.returnData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:mockName/:subPath", async (req, res) => {
  console.log(req.query, 'req')
  try {
    const mock = await Mock.findOne({ name: req.params.mockName, subPath: req.params.subPath, method: 'GET' }).lean();
    if (mock == null) {
      return res.status(404).json({ message: "Cant find Mock" });
    }
    if (mock.query) {
      let compare = JSON.stringify(mock.query) === JSON.stringify(req.query)
      if (!compare) {
        return res.status(400).json({ message: "query miss-match" });
      }
    }
    res.send(mock.returnData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/upload", upload.any(), async (req, res) => {
  res.json({ "success": true });
});

// mocked POST API
router.post("/:mockName", async (req, res) => {
  try {
    const mock = await Mock.findOne({ name: req.params.mockName, method: 'POST' });
    if (mock == null) {
      return res.status(404).json({ message: "Cant find Mock" });
    }
    if (mock.requestBody) {
      let compare = JSON.stringify(mock.requestBody) === JSON.stringify(req.body)
      if (!compare) {
        return res.status(400).json({ message: "request body miss-match" });
      }
    }
    res.json(mock.returnData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
