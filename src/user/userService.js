const User = require("./userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dontev = require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const { signUpValidator } = require("./userValidator");

// 회원 가입,
const signUp = async (userData) => {
  const { value, error } = signUpValidator.validate(userData);

  if (error) {
    throw error;
  }

  const existUser = await User.findOne({ email: value.email });

  if (existUser) {
    throw "이미 존재하는 이메일입니다.";
  }

  const hashedPassword = await bcrypt.hash(value.password, 10);
  const newUser = new User(value);
  newUser.password = hashedPassword;
  await newUser.save();
  return { email: newUser };
};

// 로그인
const signIn = async (email, password) => {
  const targetUser = await User.findOne({ email }).exec();
  if (!targetUser) {
    throw new Error("로그인 실패!");
  }

  const passwordMatch = await bcrypt.compare(password, targetUser.password);
  if (!passwordMatch) {
    throw new Error("로그인 실패!");
  }

  const token = jwt.sign({ email: targetUser.email }, secretKey, {
    expiresIn: "24h",
  });
  return { token };
};

// 토큰으로 유저 정보 조회
const getUserByToken = async (token) => {
  const tokenInfo = jwt.verify(token, secretKey);
  const email = tokenInfo.email;
  const user = await User.findOne({ email });

  return user;
};

// 아이디로 유저 정보 조회
const getUserById = async (userId) => {
  return await User.findById(userId);
};

// 전체 회원 정보 조회
const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

// 회원 정보 수정
const updateUser = async (userId, userData) => {
  try {
    userData._id = userId;
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// 회원 탈퇴
const deleteUser = async (userId) => {
  await User.findByIdAndDelete(userId);
};

module.exports = {
  signUp,
  signIn,
  getUserByToken,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
