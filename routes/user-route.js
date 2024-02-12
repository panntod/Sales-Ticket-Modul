const express = require("express");
const router = express.Router();

const { validateUser } = require("../middleware/user-premision");
const userController = require("../controller/user-controller");
const { authorize } = require("../middleware/auth");
const { IsUser, IsAdmin } = require("../middleware/role-validation");

router.get("/getAll", userController.getAllUser);
router.get("/:id", userController.getUserById);
router.post("/", userController.addUser);
router.put("/:id", userController.updateUserById);
router.patch("/", userController.changePassword);
router.delete("/:id", IsAdmin, userController.deleteUser);

// router.get("/getAll", authorize, IsAdmin, userController.getAllUser);
// router.get("/:id", authorize, IsAdmin, userController.getUserById);
// router.post("/", userController.addUser);
// router.put("/:id", authorize, IsAdmin, validateUser, userController.updateUserById);
// router.patch("/:id", IsUser, userController.changePassword);
// router.delete("/:id", authorize, IsAdmin, userController.deleteUser);

module.exports = router;
