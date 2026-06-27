const express = require("express");
const quoteController = require("../controller/quoteController");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.post("/", authenticate, quoteController.create);
router.get("/", authenticate, quoteController.list);

module.exports = router;
