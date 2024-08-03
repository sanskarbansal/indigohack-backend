const mongoose = require("mongoose");
const { Schema } = mongoose;

const FlightSchema = new Schema({
    flight_id: { type: String, required: true, unique: true },
    airline: { type: String, required: true },
    status: { type: String, required: true, enum: ["Cancelled", "On Time", "Delayed"] },
    departure_gate: { type: String, required: true },
    arrival_gate: { type: String, required: true },
    scheduled_departure: { type: Date, required: true },
    scheduled_arrival: { type: Date, required: true },
    actual_departure: { type: Date, default: null },
    actual_arrival: { type: Date, default: null },
    from: { type: String, required: true },
    to: { type: String, required: true },
});

const Flight = mongoose.model("Flight", FlightSchema);

module.exports = Flight;
