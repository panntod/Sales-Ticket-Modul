const bodyParser = require("body-parser");
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv").config();
const cors = require(`cors`);

const app = express();
const port = process.env.APP_PORT || 5000;
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server listen to ${port}`);
});
