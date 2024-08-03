const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    flightId: { type: Schema.Types.ObjectId, ref: "Flight", required: true },
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
