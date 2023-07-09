const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("./categoryController");

// 상품 생성
categoryRouter.post("/", categoryController.createCategory);

// 상품 수정
categoryRouter.put("/:categoryId", categoryController.updateCategory);

// 상품 삭제
categoryRouter.delete("/:categoryId", categoryController.deleteCategory);

// 상품 조회
categoryRouter.get("/:categoryId", categoryController.getCategoryById);

// 상품 목록 조회
categoryRouter.get("/", categoryController.getAllCategories);

module.exports = categoryRouter;
