const order = require("./orderModel");

// 카테고리 생성
const createOrder = async (orderData) => {
  const targetOrder = new order(orderData);
  return await targetOrder.save();
};

module.exports = {
  createOrder,
};
