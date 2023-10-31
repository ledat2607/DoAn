const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
