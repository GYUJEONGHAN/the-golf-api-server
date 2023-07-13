const express = require("express");
const upload = require("./multer");
const productRouter = express.Router();
const productController = require("./productController");

// 상품 생성
productRouter.post(
  "/",
  upload.array("images", 2), // 'images' 필드에서 최대 2개의 이미지를 받음
  productController.createProduct
);

// 상품 수정
productRouter.put(
  "/:productId",
  upload.array("images", 2),
  productController.updateProduct
);

// 상품 검색
productRouter.get("/search", productController.searchProducts);

// 상품 삭제
productRouter.delete("/:productId", productController.deleteProduct);

// 모든 상품 삭제
// productRouter.delete("/", productController.deleteAllProducts);

// 상품 조회
productRouter.get("/:productId", productController.getProductById);

// 상품 목록 조회
productRouter.get("/", productController.getAllProducts);

module.exports = productRouter;
