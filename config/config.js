const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config({ path: `${process.cwd()}/.env`});

module.exports = {
    app,
    router,
    "development": {
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME,
      "host": process.env.DB_HOST,
      "port": process.env.DB_PORT,
      "dialect": "postgres"
    },
    "test": {
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME,
      "host": process.env.DB_HOST,
      "port": process.env.DB_PORT,
      "dialect": "postgres"
    },
    "production": {
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME,
      "host": process.env.DB_HOST,
      "port": process.env.DB_PORT,
      "dialect": "postgres"
    }
}