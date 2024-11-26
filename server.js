const express = require("express");
// const functions = require("firebase-functions");
const { defineSecret } = require("firebase-functions/params");
const { onCall } = require("firebase-functions/v2/https");
const cors = require("cors");
const router = require("./routers/Router");
require("dotenv").config();
const app = express();

const openAiDevKeySecret = defineSecret(process.env.API_KEY);

app.listen(3000, () => {
  console.log("Listening to port: ", 3000);
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

exports.app = onCall(
  { enforceAppCheck: true, secrets: [openAiDevKeySecret] },
  app
);
