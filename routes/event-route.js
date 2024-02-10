const express = require(`express`)
const app = express()
app.use(express.json())

const eventController = require('../controller/event-controller')
const { authorize } = require('../middleware/auth')
const { IsUser, IsAdmin } = require('../middleware/role-validation')

app.get("/", authorize, IsAdmin, eventController.getAllEvent)
app.get("/:key", authorize, IsUser, eventController.findEvent)
app.post("/", authorize, IsAdmin, eventController.addEvent)
app.put("/:id", authorize, IsAdmin, eventController.updateEvent)
app.delete("/:id", authorize, IsAdmin, eventController.deleteEvent)

module.exports = app