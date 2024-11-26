const express = require("express");
const functions = require("firebase-functions");
const cors = require("cors");
const router = require("./routers/Router");
const app = express();

app.listen(3000, () => {
  console.log("Listening to port: ", 3000);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

exports.app = functions.https.onRequest(app);
