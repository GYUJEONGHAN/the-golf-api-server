const express = require("express");
const orderRouter = express.Router();
const orderController = require("./orderController");

// 주문 생성
orderRouter.post("/", orderController.createOrder);

module.exports = orderRouter;
