const mongoose = require("mongoose");
const { Schema } = mongoose;
//var uniqueValidator = require("mongoose-unique-validator");

const categorySchema = new Schema({
  categoryName: { type: String, required: true },
  parentCategoryId: { type: Schema.Types.ObjectId, ref: "Category" }, //부모 카테고리 id
});

const category = mongoose.model("Category", categorySchema);

module.exports = category;
