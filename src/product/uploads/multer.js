const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "product/uploads/"); // 파일 저장할 디렉토리
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix); // 파일명 설정
  },
});

const upload = multer({ storage });

module.exports = upload;
