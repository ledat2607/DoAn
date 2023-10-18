const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated } = require("../middleware/auth");
//new user
router.post("/new-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password, confirm } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      const filename = req.file.fieldname;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Đang xóa file hình ảnh" });
        }
      });
      return next(new ErrorHandler("Người dùng đã tồn tại", 400));
    }
    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      return next(
        new ErrorHandler("Mật khẩu phải có độ dài lớn hơn 6 ký tự !", 400)
      );
    }

    // Kiểm tra xác nhận mật khẩu
    if (password.trim() !== confirm.trim()) {
      return next(new ErrorHandler("Mật khẩu xác nhận không khớp !", 400));
    }
    const filename = req.file.filename;
    const filePath = path.join(filename);
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: filePath,
    };
    const activationToken = createAvtivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;
    try {
      await sendMail({
        email: user.email,
        subject: "Kích hoạt tài khoản",
        message: `Xin chào ${user.name}, vui lòng nhấn vào liên kết bên dưới để kích hoạt tài khoản: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Vui lòng kiểm tra email:- ${user.email} !`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//Create activationtoken
const createAvtivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//Activation user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        return next(new ErrorHandler("Mã xác thực lỗi", 400));
      }
      const { name, email, password, avatar } = newUser;
      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("Người dùng đã tồn tại", 400));
      }
      user = await User.create({
        name,
        email,
        password,
        avatar,
      });
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password.trim()) {
        return next(new ErrorHandler("Vui lòng nhập đầy đủ thông tin!", 400));
      }
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Người dùng không tồn tại", 400));
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Mật khẩu không chính xác", 400));
      }
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//load user
router.get(
  "/get-user",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler("Người dùng không tồn tại", 404));
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
module.exports = router;
