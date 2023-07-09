const user = require("./userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "mysecretkey";

// 회원가입 - 에러
// const signUp = async (email, password) => {
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new user({ email, password: hashedPassword });
//   await newUser.save();
//   return { email };
// };

// 회원가입 - 수정 후
const signUp = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = new user(userData);
  newUser.password = hashedPassword;
  await newUser.save();
  return { email: newUser };
};

const signIn = async (email, password) => {
  const targetUser = await user.findOne({ email }).exec();
  if (!targetUser) {
    throw new Error("로그인 실패!");
  }

  const passwordMatch = await bcrypt.compare(password, targetUser.password);
  if (!passwordMatch) {
    throw new Error("로그인 실패!");
  }

  const token = jwt.sign({ email: targetUser.email }, secretKey, {
    expiresIn: "1h",
  });
  return { token };
};

const signOut = async (userId) => {
  try {
    // 사용자를 찾아서 로그아웃 처리 (예시로 토큰 무효화)
    await user.findByIdAndUpdate(userId, { $set: { token: null } });

    return { message: "로그아웃이 성공적으로 처리되었습니다." };
  } catch (error) {
    throw new Error("로그아웃 중 오류가 발생했습니다.");
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
};
