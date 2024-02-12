const express = require(`express`)
const ticketController = require(`../controller/ticket-controller`)
const { authorize } = require("../middleware/auth")
const { IsAdmin } = require("../middleware/role-validation")
const app = express()

app.use(express.json())
app.post("/", authorize, ticketController.addTicket)
app.get("/", authorize, IsAdmin, ticketController.getAllTicket)
app.get("/:id", authorize, IsAdmin, ticketController.ticketByID)

module.exports = app