const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("./categoryController");

// 카테고리 생성
categoryRouter.post("/", categoryController.createCategory);

// 카테고리 수정
categoryRouter.put("/:categoryId", categoryController.updateCategory);

// 카테고리 삭제
categoryRouter.delete("/:categoryId", categoryController.deleteCategory);

// 카테고리 조회
categoryRouter.get("/:categoryId", categoryController.getCategoryById);

// 카테고리 목록 조회
categoryRouter.get("/", categoryController.getAllCategories);

module.exports = categoryRouter;
