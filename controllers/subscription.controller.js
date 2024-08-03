const Subscription = require("../models/subscription.model");
const Flight = require("../models/flight.model");

const subscribeFlight = async (req, res) => {
    try {
        const { flightId } = req.params;
        const userId = req.user._id;

        const flight = await Flight.findById(flightId);
        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        // Check if already subscribed
        const existingSubscription = await Subscription.findOne({ userId, flightId });
        if (existingSubscription) {
            return res.status(400).json({ message: "Already subscribed to this flight" });
        }

        const subscription = new Subscription({ userId, flightId });
        await subscription.save();
        res.status(201).json({ message: "Subscribed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const unsubscribeFlight = async (req, res) => {
    try {
        const { flightId } = req.params;
        const userId = req.user._id;

        await Subscription.findOneAndDelete({ userId, flightId });
        res.status(200).json({ message: "Unsubscribed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getUserSubscriptions = async (req, res) => {
    try {
        const userId = req.user._id;

        const subscriptions = await Subscription.find({ userId });
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getFlightUsers = async (req, res) => {
    try {
        const subscriptions = await Subscription.find({ flightId: req.params.flightId }).populate("userId", "email");
        res.status(200).json(subscriptions.map((d) => d.userId));
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { subscribeFlight, unsubscribeFlight, getUserSubscriptions, getFlightUsers };
