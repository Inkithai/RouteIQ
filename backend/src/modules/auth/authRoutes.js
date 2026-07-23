const express = require("express");
const router = express.Router();
const controller = require("./authController");

router.post("/signup", controller.register);
router.post("/login", controller.login);
router.post("/refresh", controller.refreshToken);

module.exports = router;
