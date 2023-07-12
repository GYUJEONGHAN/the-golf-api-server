const jwt = require("jsonwebtoken");
const userService = require("./userService");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "인증되지 않은 요청입니다." });
    }

    const user = await userService.getUserByToken(token.split(" ")[1]);
    if (!user) {
      return res.status(401).json({ error: "유효하지 않은 토큰입니다." });
    }

    req.user = user;

    // 자기 자신인지 확인
    const userId = req.params.userId;
    if (userId !== user.id) {
      req.isAdminOverride = false; // adminOnlyMiddleware 무시를 위한 플래그 설정
    } else {
      req.isAdminOverride = true; // 자기 자신인 경우 adminOnlyMiddleware 무시하기 위해 true로 설정
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "유효하지 않은 토큰입니다." });
  }
};

const adminOnlyMiddleware = async (req, res, next) => {
  if (req.isAdminOverride || req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: "접근 권한이 없습니다." });
  }
};

module.exports = { authMiddleware, adminOnlyMiddleware };
