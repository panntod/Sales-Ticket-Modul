const express = require(`express`)
const router = express.Router();

router.use(express.json())

const authController = require(`../controller/user-controller`)

router.post('/', authController.authenticate)

module.exports = router
