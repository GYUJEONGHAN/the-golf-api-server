const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  orderCount: { type: Number, required: true },
  deliveryStatus: { type: Number, defalut: 0 }, // 0-> 배송준비중 1-> 배송중 2-> 배송완료
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
