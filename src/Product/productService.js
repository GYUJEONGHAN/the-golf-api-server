const Product = require("./productModel");

// 상품 생성
const createProduct = async (productData) => {
  const product = new Product(productData);
  await product.save();
  return product;
};

// 상품 수정
const updateProduct = async (productId, productData) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    productData,
    { new: true }
  );
  return updatedProduct;
};

// 상품 삭제
const deleteProduct = async (productId) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  return deletedProduct;
};

// 상품 조회
const getProductById = async (productId) => {
  const product = await Product.findById(productId);
  return product;
};

// 상품 목록 조회
const getAllProducts = async () => {
  const products = await Product.find({});
  return products;
};

// 상품 검색
const searchProducts = async (keyword) => {
  const searchCondition = { name: { $regex: keyword, $options: "i" } };
  const products = awaitProduct.find(searchCondition);
  return products;
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  searchProducts,
};
