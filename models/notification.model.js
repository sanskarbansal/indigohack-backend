// models/Notification.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
    {
        flight_id: { type: mongoose.Schema.Types.ObjectId, ref: "Flight", required: true },
        message: { type: String, required: true },
        method: { type: String, required: true, enum: ["Email", "SMS", "App", "All"] },
        recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
