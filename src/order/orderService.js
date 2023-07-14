const order = require("./orderModel");

// 주문 생성
const createOrder = async (orderData) => {
  const targetOrder = new order(orderData);
  return await targetOrder.save();
};

// 주문 수정
const updateOrder = async (orderId, orderData) => {
  const updatedOrder = await order.findByIdAndUpdate(orderId, orderData, {
    new: true,
  });
  return updatedOrder;
};

// 주문 삭제
const deleteOrder = async (orderId) => {
  const deletedOrder = await order.findByIdAndRemove(orderId);
  return deletedOrder;
};

// 모든 주문 삭제
const deleteAllOrders = async () => {
  try {
    await order.deleteMany({});
  } catch (error) {
    throw error;
  }
};

// 주문 조회
const getOrder = async (orderId) => {
  const targetOrder = await order.findById(orderId);
  return targetOrder;
};

// 모든 주문 조회
const getAllOrders = async () => {
  const orders = await order.find();
  return orders;
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrders,
  deleteAllOrders,
};
