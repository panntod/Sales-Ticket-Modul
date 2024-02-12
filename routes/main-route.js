const express = require("express");
const router = express.Router();

const userRouter = require("./user-route");
const eventRouter = require("./event-route");
const ticketRouter = require("./ticket-route");
const auth = require(`./auth-route`);

router.use("/login", auth);
router.use("/user", userRouter);
router.use("/event", eventRouter);
router.use("/ticket", ticketRouter);

module.exports = router