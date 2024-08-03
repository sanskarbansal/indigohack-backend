const kafka = require("kafka-node");

const createKafkaTopic = async (topicName) => {
    return new Promise((resolve, reject) => {
        const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_HOST });
        const admin = new kafka.Admin(client);

        admin.createTopics(
            [
                {
                    topic: topicName,
                    partitions: 1,
                    replicationFactor: 1,
                },
            ],
            (error, result) => {
                if (error) {
                    if (error.toString().includes("TopicExistsError")) {
                        console.log(`Topic ${topicName} already exists`);
                        resolve();
                    } else {
                        console.error(`Error creating topic ${topicName}:`, error);
                        reject(error);
                    }
                } else {
                    console.log(`Topic ${topicName} created successfully`);
                    resolve(result);
                }
                client.close();
            }
        );
    });
};

module.exports = createKafkaTopic;
