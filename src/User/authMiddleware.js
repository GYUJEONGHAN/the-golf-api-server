// authMiddleware.js

const jwt = require("jsonwebtoken");
const secretKey = require("dotenv").config();

// 인증 미들웨어
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization; // 헤더에서 토큰 가져오기

    if (!token) {
      return res.status(401).json({ error: "인증되지 않은 요청입니다." });
    }

    // 토큰 검증 및 해석
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 해석된 정보를 요청 객체에 저장하여 다음 미들웨어나 컨트롤러에서 활용
    req.user = decoded;

    next(); // 다음 미들웨어나 컨트롤러로 이동
  } catch (error) {
    res.status(401).json({ error: "유효하지 않은 토큰입니다." });
  }
};

module.exports = authMiddleware;
