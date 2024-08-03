const kafka = require("kafka-node");
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_HOST });
const producer = new Producer(client);

producer.on("ready", () => {
    console.log("Kafka Producer is connected and ready.");
});

producer.on("error", (error) => {
    console.error("Kafka Producer error:", error);
});

const sendMessage = (payload) => {
    const payloads = [
        {
            topic: "notifications",
            messages: JSON.stringify(payload),
            partition: 0,
        },
    ];

    producer.send(payloads, (error, data) => {
        if (error) {
            console.error("Error sending message to Kafka:", error);
        } else {
            console.log("Message sent to Kafka:", data);
        }
    });
};

module.exports = {
    sendMessage,
};
