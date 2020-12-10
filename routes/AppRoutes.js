const express = require("express");
var jwt = require('jsonwebtoken');
const router = express.Router();

const App = require("../models/app");
const SECRET = 'secret'

// Create an App api
router.post("/", async (req, res) => {
  let checkApp = await App.findOne({ name: req.body.name });
  if (checkApp !== null) {
    return res.status(400).json({ message: "App exists " });
  }
  const app = new App(req.body);

  try {
    const token = jwt.sign(req.body.name, SECRET);
    const newApp = await app.save();
    res.status(201).json({ newApp, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update mock api
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedApp = await App.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name }, { new: true })
//     res.json(updatedApp);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// Delete a app api
router.delete("/:id", getMock, async (req, res) => {
  try {
    await res.app.remove();
    res.json({ message: "Deleted App" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// function to fetch single MockAPI
async function getMock (req, res, next) {
  try {
    app = await App.findById(req.params.id).lean();
    if (app == null) {
      return res.status(404).json({ message: "Cant find app" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.app = app;
  next();
}

module.exports = router;
