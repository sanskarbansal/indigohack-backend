const Notification = require("../models/notification.model");
const User = require("../models/user.model");
const Flight = require("../models/flight.model");
const { sendNotificationIO } = require("../services/socket.service");
const { sendMessage } = require("../services/kafkaProducer.service");

const createNotification = async (req, res) => {
    try {
        const { flight_id, message, method, recipient } = req.body;

        const flight = await Flight.findById(flight_id);

        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        for (let r of recipient) {
            const _notification = new Notification({
                flight_id,
                message,
                method,
                recipient: r,
            });
            await _notification.save();
            sendNotificationIO(flight_id, { message, timestamp: _notification.createdAt, flight_id: flight.flight_id });
            sendMessage({ method, recipient: await User.findById(r), notificationMessage: message });
        }

        res.status(201).json({ message: "Notification created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error });
    }
};

const getNotifications = async (req, res) => {
    try {
        const notifications = (await Notification.find({ recipient: req.user._id }).sort({ updatedAt: -1 }).populate("flight_id", "flight_id")).map((f) => ({
            timestamp: f.updatedAt,
            flight_id: f.flight_id.flight_id,
            message: f.message,
            _id: f._id,
        }));
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { createNotification, getNotifications };
