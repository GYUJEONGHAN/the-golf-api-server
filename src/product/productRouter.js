const express = require("express");
const productRouter = express.Router();
const productController = require("./productController");

// 상품 검색
productRouter.get("/search", productController.searchProducts);

// 상품 생성
productRouter.post("/", productController.createProduct);

// 상품 수정
productRouter.put("/:productId", productController.updateProduct);

// 상품 삭제
productRouter.delete("/:productId", productController.deleteProduct);

// 상품 조회
productRouter.get("/:productId", productController.getProductById);

// 상품 목록 조회
productRouter.get("/", productController.getAllProducts);

module.exports = productRouter;
