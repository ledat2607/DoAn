const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  shopId: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
  },
  product: {
    type: Object,
  },
  shop: {
    type: Object,
  },
  qty: { type: Number, required: true },
  priceToAdd: {
    type: Number,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isReviewed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
