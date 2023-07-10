const productService = require("./productService");

//상품 생성
const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      image: req.file ? req.file.path : null,
    };

    const product = await productService.createProduct(productData);
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "잘못된 요청입니다." });
  }
};

// 상품 수정
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    const updatedProduct = await productService.updateProduct(
      productId,
      productData
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: "잘못된 요청입니다." });
  }
};

// 상품 삭제
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await productService.deleteProduct(productId);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, message: "삭제 완료" });
  } catch (error) {
    res.status(500).json({ success: false, error: "잘못된 요청입니다." });
  }
};

// 모든 상품 삭제
const deleteAllProducts = async (req, res) => {
  try {
    await productService.deleteAllProducts();
    res
      .status(200)
      .json({ success: true, message: "모든 상품이 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "상품 삭제에 실패했습니다." });
  }
};

module.exports = {
  deleteAllProducts,
};

// 상품 조회
const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productService.getProductById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: "잘못된 요청입니다." });
  }
};

// 상품 목록 조회
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: "잘못된 요청입니다." });
  }
};

// 상품 검색
const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.query;
    const products = await productService.searchProducts(keyword);
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: "검색에 실패했습니다." });
  }
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
