const product = require("./productModel");

// 상품 생성
const createProduct = async (productData) => {
  const { images, ...restData } = productData;

  const targetProduct = new product({
    ...restData,
    images: images || [], // 복수의 이미지 경로를 그대로 저장
  });

  return await targetProduct.save();
};

// 상품 수정
const updateProduct = async (productId, productData) => {
  const { images, ...restData } = productData;
  const imagePaths = images || []; // 이미지 경로들을 그대로 저장

  const updatedProduct = await product.findByIdAndUpdate(
    productId,
    { ...restData, images: imagePaths }, // 이미지 경로들을 업데이트
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
