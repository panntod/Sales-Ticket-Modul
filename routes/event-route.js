const express = require(`express`)
const router = express.Router();

const eventController = require('../controller/event-controller')
const { authorize } = require('../middleware/auth')
const { IsAdmin, IsUser } = require("../middleware/validation");

router.get("/", authorize, IsAdmin, eventController.getAllEvent)
router.get("/:key", authorize, IsUser, eventController.findEvent)
router.post("/", authorize, IsAdmin, eventController.addEvent)
router.put("/:id", authorize, IsAdmin, eventController.updateEvent)
router.delete("/:id", authorize, IsAdmin, eventController.deleteEvent)

module.exports = router