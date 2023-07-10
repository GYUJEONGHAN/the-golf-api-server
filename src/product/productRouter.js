const express = require("express");
const upload = require("./multer");
const productRouter = express.Router();
const productController = require("./productController");

// 상품 생성 (multer 미들웨어 추가)
productRouter.post(
  "/",
  upload.single("image"),
  productController.createProduct
);

// 상품 수정
productRouter.put(
  "/:productId",
  upload.single("image"),
  productController.updateProduct
);

// 상품 삭제
productRouter.delete("/:productId", productController.deleteProduct);

// 모든 상품 삭제
productRouter.delete("/", productController.deleteAllProducts);

// 상품 조회
productRouter.get("/:productId", productController.getProductById);

// 상품 목록 조회
productRouter.get("/", productController.getAllProducts);

// 상품 검색
productRouter.get("/search", productController.searchProducts);

module.exports = productRouter;
