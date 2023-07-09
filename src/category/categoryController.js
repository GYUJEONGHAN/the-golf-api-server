const categoryService = require("./categoryService");

// 카테고리 생성
const createCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    const category = await categoryService.createCategory(categoryData);
    res.status(201).json({ success: true, category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "잘못된 요청입니다." });
  }
};

// 카테고리 수정
const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const categoryData = req.body;
    const updatedCategory = await categoryService.updateCategory(
      categoryId,
      categoryData
    );
    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, category: updatedCategory });
  } catch (error) {
    res.status(500).json({ success: false, error: "잘못된 요청입니다." });
  }
};

// 카테고리 삭제
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await categoryService.deleteCategory(categoryId);
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, message: "삭제 완료" });
  } catch (error) {
    res.status(500).json({ success: false, error: "잘못된 요청입니다." });
  }
};

// 카테고리 조회
const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await categoryService.getCategoryById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, error: "잘못된 요청입니다." });
  }
};

// 상품 목록 조회
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, error: "잘못된 요청입니다." });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getAllCategories,
};
