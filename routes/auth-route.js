const express = require(`express`)
const router = express.Router();

router.use(express.json())

const authController = require(`../middleware/auth`)

router.post('/', authController.authenticate)

module.exports = router
