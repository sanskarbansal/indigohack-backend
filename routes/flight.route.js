const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flight.controller");
const { authorizeRoles } = require("../middleware/auth");

router.get("/", flightController.getFlights);
router.get("/:id", flightController.getFlightById);
router.post("/", authorizeRoles(["admin"]), flightController.createFlight);
router.put("/:id", authorizeRoles(["admin"]), flightController.updateFlight);
router.delete("/:id", authorizeRoles(["admin"]), flightController.deleteFlight);

module.exports = router;
