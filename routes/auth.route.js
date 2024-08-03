const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", authenticateToken, authController.profile);

module.exports = router;
