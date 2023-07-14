const orderService = require("./orderService");
const product = require("../product/productModel");
const user = require("../user/userModel");

// 주문 생성
async function createOrder(req, res, next) {
  const orderData = req.body;

  try {
    // 유효한 userId 확인
    const targetUser = await user.findById(orderData.userId);
    if (!targetUser) {
      next("유효하지 않은 사용자 ID입니다.");
      return;
    }

    // 주문 데이터 생성
    const order = await orderService.createOrder(orderData);
    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
}

// 주문 수정
async function updateOrder(req, res, next) {
  const { orderId } = req.params;
  const orderData = req.body;
  console.log(orderData);
  try {
    // 주문 ID가 유효한지 확인
    const targetOrder = await orderService.getOrder(orderId);
    if (!targetOrder) {
      next("주문 ID가 유효하지 않습니다.");
    }

    // 사용자 Id 유효성 검사
    if (orderData.userId) {
      const targetUser = await user.findById(orderData.userId);
      if (!targetUser) {
        next("유효한 사용자 ID가 아닙니다.");
        return;
      }
    }

    // 주문 업데이트
    const updatedOrder = await orderService.updateOrder(orderId, orderData);
    res.json({ updatedOrder });
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
      next("주문 ID가 유효하지 않습니다.");
      return;
    }

    res.json({ message: "주문이 삭제되었습니다." });
  } catch (error) {
    next(error);
  }
}

// 모든 주문 삭제
const deleteAllOrders = async (req, res, next) => {
  try {
    await orderService.deleteAllOrders();
    res.status(200).json({ message: "모든 주문이 삭제되었습니다." });
  } catch (error) {
    next(error);
  }
};

// 주문 조회
async function getOrder(req, res, next) {
  const { orderId } = req.params;

  try {
    const order = await orderService.getOrder(orderId);
    if (!order) {
      next("주문 ID가 유효하지 않습니다.");
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
  deleteAllOrders,
  getOrder,
  getAllOrders,
};
