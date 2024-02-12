const express = require(`express`)
const app = express()

app.use(express.json())

const authController = require(`../middleware/auth`)

app.post('/', authController.authenticate)

module.exports = app
