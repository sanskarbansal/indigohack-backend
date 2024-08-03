const Flight = require("../models/flight.model");
const { sendFlightUpdate } = require("../services/socket.service");

// Get all flights
const getFlights = async (req, res) => {
    try {
        const flights = await Flight.find();
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ message: "Error fetching flights", error });
    }
};

// Get flight by ID
const getFlightById = async (req, res) => {
    try {
        const flight = await Flight.findOne({ flight_id: req.params.id });
        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }
        res.status(200).json(flight);
    } catch (error) {
        res.status(500).json({ message: "Error fetching flight", error });
    }
};

// Create a new flight
const createFlight = async (req, res) => {
    const { flight_id, airline, status, departure_gate, arrival_gate, scheduled_departure, scheduled_arrival, actual_departure, actual_arrival } = req.body;

    try {
        const newFlight = new Flight({
            flight_id,
            airline,
            status,
            departure_gate,
            arrival_gate,
            scheduled_departure,
            scheduled_arrival,
            actual_departure,
            actual_arrival,
        });

        const savedFlight = await newFlight.save();
        res.status(201).json(savedFlight);
    } catch (error) {
        res.status(500).json({ message: "Error creating flight", error });
    }
};

// Update a flight
const updateFlight = async (req, res) => {
    const { airline, status, departure_gate, arrival_gate, scheduled_departure, scheduled_arrival, actual_departure, actual_arrival } = req.body;

    try {
        // Fetch the current flight document before updating
        const currentFlight = await Flight.findById(req.params.id);

        if (!currentFlight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        // Update the flight document
        const updatedFlight = await Flight.findOneAndUpdate(
            { _id: req.params.id },
            {
                airline,
                status,
                departure_gate,
                arrival_gate,
                scheduled_departure,
                scheduled_arrival,
                actual_departure,
                actual_arrival,
            },
            { new: true, runValidators: true }
        );

        if (!updatedFlight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        sendFlightUpdate({ updatedFlight, currentFlight, status });
        res.status(200).json(updatedFlight);
    } catch (error) {
        res.status(500).json({ message: "Error updating flight", error });
    }
};

// Delete a flight
const deleteFlight = async (req, res) => {
    try {
        const deletedFlight = await Flight.findOneAndDelete({ _id: req.params.id });
        if (!deletedFlight) {
            return res.status(404).json({ message: "Flight not found" });
        }
        res.status(200).json({ message: "Flight deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting flight", error });
    }
};

module.exports = {
    getFlights,
    getFlightById,
    createFlight,
    updateFlight,
    deleteFlight,
};
