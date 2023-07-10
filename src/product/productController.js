const productService = require("./productService");
const fs = require("fs");
const upload = require("./multer");

// 상품 생성
const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      images: req.files ? req.files.map((file) => file.path) : [], // 여러 이미지 처리
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

    // 기존 이미지 paths 저장
    const existingProduct = await productService.getProductById(productId);
    const previousImagePaths = existingProduct.images || [];

    const productData = {
      ...req.body,
      images: req.files ? req.files.map((file) => file.path) : [],
    };

    const updatedProduct = await productService.updateProduct(
      productId,
      productData
    );

    // 이미지 파일이 들어왔고, 이전 이미지가 존재한다면 이전 이미지 삭제
    if (req.files.length > 0 && previousImagePaths.length > 0) {
      for (const imagePath of previousImagePaths) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "잘못된 요청입니다." });
  }
};

// 상품 삭제
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const existingProduct = await productService.getProductById(productId);
    const previousImagePaths = existingProduct.images || [];

    const deletedProduct = await productService.deleteProduct(productId);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // 이전 이미지들 삭제
    if (previousImagePaths.length > 0) {
      for (const imagePath of previousImagePaths) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ success: true, message: "삭제 완료" });
  } catch (error) {
    res.status(500).json({ success: false, error: "잘못된 요청입니다." });
  }
};

// 모든 상품 삭제
const deleteAllProducts = async (req, res) => {
  try {
    // 이미지 폴더 경로
    const imageDirectory = "src/product/productImages/";

    // 폴더 내의 모든 파일과 폴더 가져오기
    const files = fs.readdirSync(imageDirectory);

    // 파일과 폴더 삭제
    files.forEach((file) => {
      const filePath = imageDirectory + file;
      fs.unlinkSync(filePath);
    });

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
