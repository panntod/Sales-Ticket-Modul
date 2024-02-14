const express = require(`express`)
const ticketController = require(`../controller/ticket-controller`)
const { authorize } = require("../middleware/auth")
const { IsAdmin} = require("../middleware/user-validation");
const router = express.Router();

router.use(express.json())
router.post("/", authorize, ticketController.addTicket)
router.get("/", authorize, IsAdmin, ticketController.getAllTicket)
router.get("/:id", authorize, IsAdmin, ticketController.ticketByID)

module.exports = router