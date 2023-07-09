const Category = require("./categoryModel");

// 카테고리 생성
const createCategory = async (categoryData) => {
  const category = new Category(categoryData);
  await category.save();
  return category;
};

// 카테고리 수정
const updateCategory = async (categoryId, categoryData) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    categoryData,
    { new: true }
  );
  return updatedCategory;
};

// 카테고리 삭제
const deleteCategory = async (categoryId) => {
  const deletedProduct = await Category.findByIdAndDelete(categoryId);
  return deletedProduct;
};

// 상품 조회
const getCategoryById = async (categoryId) => {
  const category = await Category.findById(categoryId);
  return category;
};

// 상품 목록 조회
const getAllCategories = async () => {
  const categories = await Category.find({});
  return categories;
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getAllCategories,
};
