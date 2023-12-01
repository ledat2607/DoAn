const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng điền đầy đủ họ và tên !"],
  },
  email: {
    type: String,
    required: [true, "Vui lòng điền email của bạn !"],
  },
  password: {
    type: String,
    required: [true, "Vui lòng nhập mật khẩu"],
    minLength: [6, "Mật khẩu phải có độ dài lớn hơn 6 ký tự"],
    select: false,
  },
  phoneNumber: {
    type: Number,
  },
  addresses: [
    {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      town: {
        type: String,
      },
      street: {
        type: String,
      },

      addressType: {
        type: String,
      },
    },
  ],
  role: {
    type: String,
    default: "user",
  },
  avatar: {
    // public_id: {
    //   type: String,
    //   required: true,
    // },
    // url: {
    //   type: String,
    //   required: true,
    // },
    type: String,
  },
  birthDay: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  discountCode: [
    {
      code: { type: String },
      value: { type: Number },
    },
  ],
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

//  Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
