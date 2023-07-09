const product = require("./productModel");

// 상품 생성
const createProduct = async (productData) => {
  const targetProduct = new product(productData);
  return await targetProduct.save();
};

// 상품 수정
const updateProduct = async (productId, productData) => {
  const updatedProduct = await product.findByIdAndUpdate(
    productId,
    productData,
    { new: true }
  );
  return updatedProduct;
};

// 상품 삭제
const deleteProduct = async (productId) => {
  return await product.findByIdAndDelete(productId);
};

// 상품 조회
const getProductById = async (productId) => {
  return await product.findById(productId);
};

// 상품 목록 조회
const getAllProducts = async () => {
  return await product.find({});
};

// 상품 검색
const searchProducts = async (keyword) => {
  const searchCondition = { name: { $regex: keyword, $options: "i" } };
  return await product.find(searchCondition);
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  searchProducts,
};
