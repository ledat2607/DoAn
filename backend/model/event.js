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
  status: {
    type: String,
    default: "Chưa diễn ra",
  },

  discountPercent: {
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
// Sử dụng hook pre để kiểm tra và cập nhật status trước khi lưu
eventSchema.pre("save", function (next) {
  const currentDate = new Date();
  const startDate = new Date(this.start_Date);
  const finishDate = new Date(this.Finish_Date);

  // Kiểm tra xem start_Date có bằng ngày hiện tại hay không
  if (
    startDate.getDate() === currentDate.getDate() &&
    startDate.getMonth() === currentDate.getMonth() &&
    startDate.getFullYear() === currentDate.getFullYear()
  ) {
    // Nếu có, cập nhật status thành "Đang diễn ra"
    this.status = "Đang diễn ra";
  }

  // Kiểm tra xem Finish_Date có nhỏ hơn ngày hiện tại hay không
  if (finishDate < currentDate) {
    // Nếu có, cập nhật status thành "Đã kết thúc"
    this.status = "Đã kết thúc";
  }

  // Tiếp tục quá trình lưu
  next();
});

module.exports = mongoose.model("Event", eventSchema);
