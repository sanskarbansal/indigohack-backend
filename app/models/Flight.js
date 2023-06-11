const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Flight = sequelize.define("Flight", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ffrom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ftime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Flight;
