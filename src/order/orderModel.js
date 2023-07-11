const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  orderCount: { type: Number, required: true },
  orderStatus: { type: String, default: null, required: true }, //주문상태, 값이 들어오면 주문완료
  deliveryStatus: { type: Number, defalut: 0 },
  deliveryTrackingNumber: { type: Number },
  orderDate: { type: Date },
  address: {
    streetAddress: { type: String },
    detailAddress: { type: String },
    postalCode: { type: String },
  },
});

const order = mongoose.model("Order", orderSchema);

module.exports = order;
