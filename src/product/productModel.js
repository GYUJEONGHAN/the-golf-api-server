const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  categoryName: { type: String },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }], // 복수의 이미지를 배열로 저장
  brand: { type: String },
  size: [{ type: String }],
  color: { type: String },
  stock: { type: Number, default: 0 },
  isForBeginner: { type: String, default: null }, // 초심자 용품 확인 변수
});

const product = mongoose.model("Product", productSchema);

module.exports = product;
