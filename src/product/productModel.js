const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  categoryName: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  brand: { type: String },
  description: { type: String },
  size: { type: String },
  color: { type: String },
  stock: { type: Number, default: 0 },
  isForBeginner: { type: String, default: null }, //값이 들어오면 초심자용 용품
});

const product = mongoose.model("Product", productSchema);

module.exports = product;
