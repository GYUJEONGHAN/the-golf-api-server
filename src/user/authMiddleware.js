const jwt = require("jsonwebtoken");
const userService = require("./userService");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "인증되지 않은 요청입니다." });
    }

    const user = await userService.getUserByToken(token.split(" ")[1]);
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ error: "유효하지 않은 토큰입니다." });
  }
};

const adminOnlyMiddleware = async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: "접근 권한이 없습니다." });
  }
};

module.exports = { authMiddleware, adminOnlyMiddleware };
