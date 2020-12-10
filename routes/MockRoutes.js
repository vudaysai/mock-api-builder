const express = require("express");
const router = express.Router({ mergeParams: true });
const Mock = require("../models/Mock");

// Get all mocked APIs created
router.get("/", async (req, res) => {
  try {
    if (!req.params.appId) {
      return res.json({ message: 'App Id Required.' });
    }
    const mocks = await Mock.find({ appId: req.params.appId });
    res.json(mocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create one mock api
router.post("/", async (req, res) => {
  let checkMock = await Mock.findOne({ name: req.body.name, method: req.body.method, appId: req.params.appId });
  if (checkMock !== null) {
    return res.status(400).json({ message: "Mock already exists" });
  }
  const mock = new Mock({ ...req.body, appId: req.params.appId });

  try {
    const newMock = await mock.save();
    res.status(201).json(newMock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get one MockAPI
router.get("/:id", getMock, (req, res) => {
  res.json(res.mock);
});

// Update mock api
router.put("/:id", getMock, async (req, res) => {
  try {
    const updatedMockAPI = await Mock.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.json(updatedMockAPI);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one mock-api
router.delete("/:id", getMock, async (req, res) => {
  try {
    await res.mock.remove();
    res.json({ message: "Deleted Mock" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// function to fetch single MockAPI
async function getMock (req, res, next) {
  try {
    mock = await Mock.findById(req.params.id).lean();
    if (mock == null) {
      return res.status(404).json({ message: "Cant find Mock" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.mock = mock;
  next();
}

module.exports = router;
