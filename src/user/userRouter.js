const express = require("express");
const userRouter = express.Router();
const userController = require("./userController");
const { authMiddleware, adminOnlyMiddleware } = require("./authMiddleware");

// 특정 회원 정보 조회/내 정보 조회
userRouter.get("/:userId", authMiddleware, userController.getUser);

// 회원가입
userRouter.post("/sign-up", userController.signUp);

// 로그인
userRouter.post("/sign-in", userController.signIn);

// 로그인/아웃 상태 확인
userRouter.post(
  "/sign-check",
  authMiddleware,
  //   adminOnlyMiddleware,
  userController.signCheck
);

// 전체 회원 정보 조회
userRouter.get("/", userController.getAllUsers);

//회원 정보 수정
userRouter.put("/:userId", userController.updateUser);

//회원 탈퇴
userRouter.delete("/:userId", userController.deleteUser);

// userRouter.get("/list", userController.getUserList);
// userRouter.post("/sign-out", userController.signOut);

module.exports = userRouter;
