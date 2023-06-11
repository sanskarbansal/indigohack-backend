var express = require("express");
const Flight = require("./models/Flight");
var app = express();

async function createDummyData() {
    try {
        // Create dummy users
        await Flight.bulkCreate([
            { name: "Indigo", ffrom: "Bombay", fto: "New Delhi", ftime: "15AM" },
            { name: "Indigo", ffrom: "New Delhi", fto: "Goa", ftime: "15AM" },
            { name: "Indigo", ffrom: "Goa", fto: "New Delhi", ftime: "15AM" },
            { name: "Indigo", ffrom: "Chennai", fto: "New Delhi", ftime: "15AM" },
            { name: "Indigo", ffrom: "Kerla", fto: "New Delhi", ftime: "15AM" },
            // Add more dummy data as needed
        ]);

        console.log("Dummy data created successfully.");
    } catch (error) {
        console.error("Error creating dummy data:", error);
    } finally {
        // Close the Sequelize connection
        await Flight.sequelize.close();
    }
}

app.get("/flights", async function (req, res) {
    const flights = await Flight.findAll();
    return res.json(flights);
});

app.listen(8080, async function () {
    console.log("Example app listening on port 3000!");
    await createDummyData();
});
