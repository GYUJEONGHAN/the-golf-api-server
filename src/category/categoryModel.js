const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  categoryName: { type: String, required: true },
  parentCategoryId: { type: Schema.Types.ObjectId, ref: "Category" }, //부모 카테고리를 id를 통해 설정
});

const category = mongoose.model("Category", categorySchema);

module.exports = category;
