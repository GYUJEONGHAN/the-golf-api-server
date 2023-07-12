const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = "src/product/productImages/";

    // 디렉토리가 존재하지 않는 경우 생성
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
      console.log("디렉토리 생성");
    }

    cb(null, directory);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueSuffix}${extname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;
