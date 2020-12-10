require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const { verifyToken } = require('./helpers/tokenVerify')
// Change here
const dbUrl = 'mongodb://sxp:sxptECHSOPHY@mongo:27017/mock-builder-dev';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", error => console.error(error));
db.once("open", () => {
  console.log("connected to database")
  mongoose.set('useFindAndModify', false)
  mongoose.set('runValidators', true)

});

app.use(express.json());

const appRouter = require("./routes/AppRoutes");
app.use("/apps", appRouter);

const MockRouter = require("./routes/MockRoutes");
app.use("/apps/:appId/mocks", verifyToken, MockRouter);

const MockRunnerRouter = require("./routes/MockRunnerRoutes");
app.use("/apps/:appId/api", verifyToken, MockRunnerRouter);

// Change here
app.listen(3009, () => console.log("server started"));
