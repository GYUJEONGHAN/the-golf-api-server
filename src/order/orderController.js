const orderService = require("./orderService");
const product = require("../product/productModel");
const user = require("../user/userModel");

// 주문 생성
async function createOrder(req, res, next) {
  const orderData = req.body;

  try {
    // 유효한 userId, productId인지 확인
    const targetUser = await user.findById(orderData.userId);
    const targetProduct = await product.findById(orderData.productId);
    if (!targetUser || !targetProduct) {
      next(new Error("사용자 또는 상품 id가 유효하지 않습니다."));
      return;
    }

    const order = await orderService.createOrder(orderData);
    res.status(201).json({ success: true, order });
  } catch (error) {
    next(error);
  }
}

// 주문 수정
async function updateOrder(req, res, next) {
  const { orderId } = req.params;
  const orderData = req.body;

  try {
    const targetUser = await user.findById(orderData.userId);
    const targetProduct = await product.findById(orderData.productId);
    if (!targetUser || !targetProduct) {
      next(new Error("유효한 사용자 ID 또는 상품 ID가 아닙니다."));
      return;
    }

    const order = await orderService.updateOrder(orderId, orderData);
    if (!order) {
      next(new Error("주문 ID가 유효하지 않습니다."));
      return;
    }

    res.json({ order });
  } catch (error) {
    next(error);
  }
}

// 주문 삭제
async function deleteOrder(req, res, next) {
  const { orderId } = req.params;

  try {
    const order = await orderService.deleteOrder(orderId);
    if (!order) {
      next(new Error("주문 ID가 유효하지 않습니다."));
      return;
    }

    res.json({ message: "주문이 삭제되었습니다." });
  } catch (error) {
    next(error);
  }
}

// 주문 조회
async function getOrder(req, res, next) {
  const { orderId } = req.params;

  try {
    const order = await orderService.getOrder(orderId);
    if (!order) {
      next(new Error("주문 ID가 유효하지 않습니다."));
      return;
    }

    res.json({ order });
  } catch (error) {
    next(error);
  }
}

// 모든 주문 조회
async function getAllOrders(req, res, next) {
  try {
    const orders = await orderService.getAllOrders();
    res.json({ orders });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
};
