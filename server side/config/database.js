const sequelize = require("sequelize");
require('dotenv').config();

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const database = new sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    dialect: "mysql",
    host: "localhost",
    max: 30
});

module.exports = database;