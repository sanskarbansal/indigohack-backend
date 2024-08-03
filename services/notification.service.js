require("dotenv").config();
const nodemailer = require("nodemailer");
const twilio = require("twilio");

const transporter = nodemailer.createTransport({
    host: process.env.NODE_MAILER_SMTP_HOST,
    port: process.env.NODE_MAILER_SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.NODE_MAILER_SMTP_USER,
        pass: process.env.NODE_MAILER_SMTP_PASS,
    },
});

let _twillioClient;

function getTwillioClient() {
    try {
        if (_twillioClient) {
            return _twillioClient;
        }
        _twillioClient = twilio(process.env.TWILLIO_SID, process.env.TWILLIO_AUTH_TOKEN);
        return _twillioClient;
    } catch (error) {
        console.log("Error while connecting to twillio");
    }
}

const sendEmail = async (recipient, message) => {
    const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: recipient,
        subject: "Flight Notification",
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

const sendSMS = async (recipient, message) => {
    try {
        const twillioClient = getTwillioClient();
        if (!twillioClient) {
            console.log("Twillio Not connected!");
            return;
        }
        await twillioClient.messages.create({
            body: message,
            from: process.env.TWILLIO_PHONE_NUMBER,
            to: recipient,
        });
        console.log("SMS sent successfully");
    } catch (error) {
        console.error("Error sending SMS:", error);
    }
};

const sendPushNotification = async (recipient, message) => {
    console.log("Push notification logic to be implemented");
};

const sendNotification = async (method, recipient, message) => {
    switch (method) {
        case "Email":
            console.log(recipient.email, message);
            await sendEmail(recipient.email, message);
            break;
        case "SMS":
            console.log(recipient.phone, message);
            await sendSMS(recipient.phone, message);
            break;
        case "App":
            await sendPushNotification(recipient, message);
            break;
        case "All":
            await sendEmail(recipient.email, message);
            await sendSMS(recipient.phone, message);
            await sendPushNotification(recipient, message);
            break;
        default:
            console.error("Unknown notification method:", method);
    }
};

module.exports = {
    sendNotification,
};
