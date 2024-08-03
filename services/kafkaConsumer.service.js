const kafka = require("kafka-node");
const { sendNotification } = require("./notification.service");

const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_HOST });

const consumer = new Consumer(client, [{ topic: "notifications", partition: 0 }], {
    autoCommit: false, // Disable auto-commit to manage message processing manually
});

consumer.on("message", async (message) => {
    try {
        const notificationData = JSON.parse(message.value);
        const { method, recipient, notificationMessage } = notificationData;

        await sendNotification(method, recipient, notificationMessage);

        // Manually commit the message offset after successful processing
        consumer.commit((error, data) => {
            if (error) {
                console.error("Error committing message:", error);
            } else {
                console.log("Message committed:", data);
            }
        });
    } catch (error) {
        console.error("Error processing notification:", error);
        // Optionally, you could add retry logic here or log the message for later inspection
    }
});
consumer.on("error", (error) => {
    console.error("Kafka Consumer error:", error);
});
