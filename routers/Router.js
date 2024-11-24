const express = require("express");
const { controller } = require("../controllers/Controller");

const router = express.Router();

router.post("/", controller);

module.exports = router;
