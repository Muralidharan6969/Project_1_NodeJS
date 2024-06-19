const express = require('express')
const app = express()
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
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
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