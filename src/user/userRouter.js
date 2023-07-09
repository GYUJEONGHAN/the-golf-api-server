const express = require("express");
const userRouter = express.Router();
const userController = require("./userController");
const authMiddleware = require("./authMiddleware");

userRouter.post("/sign-up", userController.signUp);
userRouter.post("/sign-in", userController.signIn);
userRouter.get("/list", userController.gerUserList);

userRouter.post("/sign-out", authMiddleware, userController.signOut);

module.exports = userRouter;
