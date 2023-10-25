const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tên sự kiện !"],
  },
  description: {
    type: String,
    required: [true, "Miêu tả sự kiện"],
  },
  category: {
    type: String,
    required: [true, "Chọn danh mục được giảm giá !"],
  },
  start_Date: {
    type: Date,
    required: true,
  },
  Finish_Date: {
    type: Date,
    required: true,
  },
  //   status: {
  //     type: String,
  //     default: "Running",
  //   },
  tags: {
    type: String,
  },
  productId: {
    type: String,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  discountEventPrice: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: [true, "Nhập số lượng sản phẩm cho sự kiện!"],
  },
  images: [
    {
      //   public_id: {
      //     type: String,
      //     required: true,
      //   },
      //   url: {
      //     type: String,
      //     required: true,
      //   },
      type: String,
    },
  ],
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Event", eventSchema);
