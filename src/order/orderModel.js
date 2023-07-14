const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      orderCount: { type: Number, required: true },
      price: { type: Number, required: true }, // 각 상품의 가격
      size: [{ type: String }],
      subtotal: { type: Number, required: true }, // 각 상품별 주문 금액
    },
  ],
  totalAmount: { type: Number, required: true }, // 총 주문 금액
  deliveryStatus: { type: Number, default: 0 }, // 0-> 배송준비중 1-> 배송중 2-> 배송완료
  orderDate: { type: Date },
  address: {
    type: {
      streetAddress: { type: String },
      detailAddress: { type: String },
      postalCode: { type: String },
    },
  },
});

const order = mongoose.model("Order", orderSchema);

module.exports = order;
