const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require(`cors`);
const app = express();
const port = process.env.APP_PORT;
const mainRoute = require("./routes/main-route")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.static(__dirname));
app.use(mainRoute)

app.listen(port, () => {
  console.log(`Server listen to ${port}`);
});
