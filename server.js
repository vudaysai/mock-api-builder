require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dbUrl = 'mongodb://${process.env.mongoUser}:${process.env.mongoUserPassword}@mongo:27017/mock-builder-dev';

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

const MockRouter = require("./routes/MockRoutes");
app.use("/mocks", MockRouter);

const MockRunnerRouter = require("./routes/MockRunnerRoutes");
app.use("/api", MockRunnerRouter);

app.listen(3000, () => console.log("server started"));
