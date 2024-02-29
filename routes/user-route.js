const express = require("express");
const router = express.Router();

const userController = require("../controller/user-controller");
const { authorize, authenticate } = require("../middleware/auth");
const { ValidateRegister, IsAdmin, IsUser } = require("../middleware/validation");

router.get("/getAll", userController.getAllUser);
router.get("/:id", userController.getUserById);
router.post("/", ValidateRegister, userController.register);
router.put("/:id", ValidateRegister, userController.updateUserById);
router.patch("/", userController.resetPassword);
router.delete("/:id", IsAdmin, userController.deleteUser);

// router.get("/getAll", authorize, IsAdmin, userController.getAllUser);
// router.get("/:id", authorize, IsAdmin, userController.getUserById);
// router.post("/", userController.addUser);
// router.put("/:id", authorize, IsAdmin, validateUser, userController.updateUserById);
// router.patch("/:id", IsUser, userController.changePassword);
// router.delete("/:id", authorize, IsAdmin, userController.deleteUser);

module.exports = router;
