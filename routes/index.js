const express = require("express");
const router = express.Router();

router.use(express.json());

// router.use("/", require("./authRoutes"));
router.use("/jobs", require("./jobRoutes"));

module.exports = router;
