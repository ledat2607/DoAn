const mongoose = require("mongoose");

const coupounCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Điền tên mã giảm giá!"],
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  typeCode: { type: String, required: true },
  valueDiscount: { type: Number, required: true },
  shopId: {
    type: String,
    required: true,
  },
  selectedProduct: {
    type: String,
  },
  sum: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CoupounCode", coupounCodeSchema);
