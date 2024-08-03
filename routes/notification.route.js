const express = require("express");
const router = express.Router();
const { createNotification, getNotifications } = require("../controllers/notification.controller");
const { authorizeRoles } = require("../middleware/auth");

router.post("/", authorizeRoles(["admin"]), createNotification);
router.get("/", getNotifications);

module.exports = router;
