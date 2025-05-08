const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/myProfile", authMiddleware, userController.getMyInfo);
router.get("/getAllUsers", authMiddleware, userController.getAllUsers);
router.get("/getUserById/:id", userController.getUserById);

router.get("/verify/:userId/:uniqueString", userController.verify);
router.get("/verified", userController.verified);

router.post("/requestPasswordReset", userController.requestPasswordReset);
router.post("/resetPassword", userController.resetPassword);

module.exports = router;
