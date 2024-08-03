const express = require("express");
const router = express.Router();
const { subscribeFlight, unsubscribeFlight, getUserSubscriptions, getFlightUsers } = require("../controllers/subscription.controller");
const { authorizeRoles } = require("../middleware/auth");

router.post("/subscribe/:flightId", subscribeFlight);
router.post("/unsubscribe/:flightId", unsubscribeFlight);
router.get("/subscriptions", getUserSubscriptions);
router.get("/subscriptions/:flightId", authorizeRoles(["admin"]), getFlightUsers);

module.exports = router;
