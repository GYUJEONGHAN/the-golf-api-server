const express = require("express");
const orderRouter = express.Router();
const orderController = require("./orderController");

// 주문 생성
orderRouter.post("/", orderController.createOrder);

// 주문 수정
orderRouter.put("/:orderId", orderController.updateOrder);

// 주문 삭제
orderRouter.delete("/:orderId", orderController.deleteOrder);

// 모든 주문 삭제
orderRouter.delete("/", orderController.deleteAllOrders);

// 주문 조회
orderRouter.get("/:orderId", orderController.getOrder);

// 주문 목록 조회
orderRouter.get("/", orderController.getAllOrders);

module.exports = orderRouter;
