const JWT = require('jsonwebtoken');
const SECRET = 'secret'
const App = require('../models/app')

module.exports.verifyToken = async (req, res, next) => {
  const app = await App.findById(req.params.appId).lean()
  try {
    var decoded = JWT.verify(req.headers.token, SECRET);
    if (app.name === decoded) {
      return next()
    }
    res.status(400).json({ message: "Invalid App Token" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
