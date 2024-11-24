const express = require("express");
const router = require("./routers/Router");
const app = express();

app.listen(3000, () => {
  console.log("Listening to port: ", 3000);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
