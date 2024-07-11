const fs = require("fs");
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  // test: {
  //   username: username,
  //   password: password,
  //   database: dbName,
  //   host: "127.0.0.1",
  //   port: 5432,
  //   dialect: "postgres",
  //   dialectOptions: {
  //     bigNumberStrings: true,
  //   },
  // },
  // production: {
  //   username: username,
  //   password: password,
  //   database: dbName,
  //   host: "127.0.0.1",
  //   port: 5432,
  //   dialect: "postgres",
  //   dialectOptions: {
  //     bigNumberStrings: true,
  //     ssl: {
  //       ca: fs.readFileSync(__dirname + "/mysql-ca-main.crt"),
  //     },
  //   },
  // },
};
