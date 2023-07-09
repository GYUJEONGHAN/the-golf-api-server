const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  categoryName: { type: String, required: true },
});

const category = mongoose.model("Category", categorySchema);

module.exports = category;
