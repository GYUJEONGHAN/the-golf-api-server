const product = require("./productModel");

// 상품 생성
const createProduct = async (productData) => {
  const { image, ...restData } = productData;
  const imagePath = image || null; // 이미지 경로를 그대로 저장

  const targetProduct = new product({
    ...restData,
    image: imagePath,
  });

  return await targetProduct.save();
};

const updateProduct = async (productId, productData) => {
  const { image, ...restData } = productData;
  const imagePath = image || null; // 이미지 경로를 그대로 저장

  const updatedProduct = await product.findByIdAndUpdate(
    productId,
    { ...restData, image: imagePath }, // 이미지 경로를 업데이트
    { new: true }
  );
  return updatedProduct;
};

// 상품 삭제
const deleteProduct = async (productId) => {
  return await product.findByIdAndDelete(productId);
};

// 모든 상품 삭제
const deleteAllProducts = async () => {
  try {
    await product.deleteMany({});
  } catch (error) {
    throw error;
  }
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
  deleteAllProducts,
  getProductById,
  getAllProducts,
  searchProducts,
};
