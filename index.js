const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require(`cors`);
const app = express();
const port = process.env.APP_PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.static(__dirname));

const userRouter = require("./routes/user-route");
const eventRouter = require("./routes/event-route");
const ticketRouter = require("./routes/ticket-route");
const auth = require(`./routes/auth-route`);

app.use("/login", auth);
app.use("/user", userRouter);
app.use("/event", eventRouter);
app.use("/ticket", ticketRouter);

app.listen(port, () => {
  console.log(`Server listen to ${port}`);
});
