const categoryService = require("./categoryService");

const createCategory = async (req, res, next) => {
  try {
    const { categoryName, parentCategoryId } = req.body;

    let categoryData = { categoryName };

    // 만약 parentCategoryName가 req으로 온 경우
    if (parentCategoryId) {
      const parentExists = await categoryService.getCategoryById(
        parentCategoryId
      );
      if (!parentExists) {
        // 부모 카테고리가 존재하지 않는 카테고리라면
        next(new Error("상위 카테고리가 존재하지 않습니다."));
        return;
      }
      categoryData.parentCategoryId = parentCategoryId;
    }

    const category = await categoryService.createCategory(categoryData);
    res.status(201).json({ category });
  } catch (error) {
    next(error); // 에러를 다음 미들웨어로 전달
  }
};

// 카테고리 수정
const updateCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const categoryData = req.body;
    const originalCategoryData = await categoryService.getCategoryById(
      categoryId
    );
    // 부모 카테고리명이 제공된 경우 자신 카테고리 id이 아닌지 검사
    if (categoryData.parentCategoryId) {
      if (originalCategoryData._id === categoryData.parentCategoryId) {
        next(new Error("현재 카테고리로 상위 카테고리를 지정할 수 없습니다."));
        return;
      }
    }

    // 부모 카테고리명이 제공된 경우 해당 부모 카테고리의 유효성을 검사
    if (categoryData.parentCategoryId) {
      const parentCategory = await categoryService.getCategoryById(
        categoryData.parentCategoryId
      );
      if (!parentCategory) {
        next(new Error("상위 카테고리를 찾을 수 없습니다."));
        return;
      }
    }

    const updatedCategory = await categoryService.updateCategory(
      categoryId,
      categoryData
    );

    if (!updatedCategory) {
      next(new Error("category not found"));
      return;
    }

    res.status(200).json({ updatedCategory });
  } catch (error) {
    next(error);
  }
};

// 카테고리 삭제
const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await categoryService.deleteCategory(categoryId);
    if (!deletedCategory) {
      next(new Error("category not found"));
      return;
    }
    res.status(200).json({ message: "삭제 완료" });
  } catch (error) {
    next(error);
  }
};

// 모든 카테고리 삭제
const deleteAllCategories = async (req, res, next) => {
  try {
    await categoryService.deleteAllCategories();
    res.status(200).json({ message: "모든 카테고리가 삭제되었습니다." });
  } catch (error) {
    next(error);
  }
};

// 카테고리 조회
const getCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await categoryService.getCategoryById(categoryId);
    if (!category) {
      next(new Error("category not found"));
      return;
    }
    res.status(200).json({ category });
  } catch (error) {
    next(error);
  }
};

// 카테고리 목록 조회
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({ categories });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
  getCategoryById,
  getAllCategories,
};
