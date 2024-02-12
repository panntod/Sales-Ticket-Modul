const express = require("express");
const app = express();

const { validateUser } = require("../middleware/user-premision");
const userController = require("../controller/user-controller");
const { authorize } = require("../middleware/auth");
const { IsUser, IsAdmin } = require("../middleware/role-validation");

app.get("/getAll", userController.getAllUser);
app.get("/:id", userController.getUserById);
app.post("/", userController.addUser);
app.put("/:id", userController.updateUserById);
app.patch("/:id", userController.changePassword);
app.delete("/:id", IsAdmin, userController.deleteUser);

// app.get("/getAll", authorize, IsAdmin, userController.getAllUser);
// app.get("/:id", authorize, IsAdmin, userController.getUserById);
// app.post("/", userController.addUser);
// app.put("/:id", authorize, IsAdmin, validateUser, userController.updateUserById);
// app.patch("/:id", IsUser, userController.changePassword);
// app.delete("/:id", authorize, IsAdmin, userController.deleteUser);

module.exports = app;
