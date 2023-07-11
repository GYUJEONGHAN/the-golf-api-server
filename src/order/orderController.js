const orderService = require("./orderService");
const product = require("../product/productModel");
const user = require("../user/userModel");

// 주문 생성
async function createOrder(req, res) {
  const orderData = req.body;

  try {
    // 유효한 userId, productId인지 확인
    const targetUser = await user.findById(orderData.userId);
    const targetProduct = await product.findById(orderData.productId);
    if (!targetUser || !targetProduct) {
      return res
        .status(404)
        .json({ error: "유효한 사용자 ID 또는 상품 ID가 아닙니다." });
    }

    const order = await orderService.createOrder(orderData);
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: "주문 생성 중에 오류가 발생했습니다." });
  }
}

module.exports = {
  createOrder,
};
