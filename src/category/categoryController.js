const categoryService = require("./categoryService");

// 카테고리 생성
const createCategory = async (req, res) => {
  try {
    const { categoryName, parentCategoryId } = req.body;

    let categoryData = { categoryName };

    //만약 parentCategoryId가 요청으로 온 경우
    if (parentCategoryId) {
      const parentExists = await categoryService.getCategoryById(
        parentCategoryId
      );
      if (!parentExists) {
        // 부모 카테고리가 존재하지 않는 카테고리라면
        return res.status(400).json({
          success: false,
          error: "Parent category not found",
        });
      }
      categoryData.parentCategoryId = parentCategoryId;
    }

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

    // 부모 카테고리 ID가 제공된 경우 자신의 id와 비교 유효성 검사
    if (categoryData.parentCategoryId) {
      if (categoryId === categoryData.parentCategoryId) {
        return res.status(404).json({
          success: false,
          message: "상위 카테고리를 자신으로 지정할 수 없음",
        });
      }
    }

    // 부모 카테고리 ID가 제공된 경우 해당 부모 카테고리의 유효성을 검사
    if (categoryData.parentCategoryId) {
      const parentCategory = await categoryService.getCategoryById(
        categoryData.parentCategoryId
      );
      if (!parentCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Parent category not found" });
      }
    }

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

// 카테고리 목록 조회
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
