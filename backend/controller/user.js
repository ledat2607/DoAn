const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const User = require("../model/user");
const Product = require("../model/product");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const adminToken = require("../utils/adminToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated } = require("../middleware/auth");
//new user
router.post("/new-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password, confirm, phoneNumber } = req.body;
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
      phoneNumber: phoneNumber,
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
      const { name, email, password, avatar, phoneNumber } = newUser;
      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("Người dùng đã tồn tại", 400));
      }
      user = await User.create({
        name,
        email,
        password,
        avatar,
        phoneNumber,
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
//login admin
router.post(
  "/login-admin",
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
      if (user.role !== "admin") {
        return next(new ErrorHandler("Không có quyền truy cập", 400));
      }
      adminToken(user, 201, res);
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
//load admin
router.get("/get-admin", async (req, res, next) => {
  try {
    // Sử dụng phương thức find với điều kiện là role là "admin"
    const admin = await User.find({ role: "admin" });

    // Kiểm tra nếu không có admin nào được tìm thấy
    if (!admin || admin.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng với vai trò admin",
      });
    }

    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
});

module.exports = router;

//Logout user
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: "Đăng xuất thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//update user infor
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, phoneNumber } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return next(new ErrorHandler("Người dùng không tồn tại!", 400));
      }
      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;
      await user.save();
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Xóa avatar cũ của người dùng
      const existsUser = await User.findById(req.user.id);
      const existsAvatarPath = `uploads/${existsUser.avatar}`;
      fs.unlinkSync(existsAvatarPath);

      // Cập nhật avatar mới của người dùng
      const fileUrl = path.join(req.file.filename);
      const updatedUser = await User.findByIdAndUpdate(req.user.id, {
        avatar: fileUrl,
      });

      // Cập nhật avatar của người dùng trong tất cả các sản phẩm
      await Product.updateMany(
        { "reviews.user._id": req.user.id },
        {
          $set: {
            "reviews.$[elem].user.avatar": fileUrl,
          },
        },
        {
          arrayFilters: [{ "elem.user._id": req.user.id }],
        }
      );

      res.status(200).json({
        success: true,
        updatedUser,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update user addresses
router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(new ErrorHandler("Địa chỉ này đã tồn tại!", 404));
      }
      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );
      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        //add new address
        user.addresses.push(req.body);
      }
      await user.save();
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");
      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Mật khẩu cũ không chính xác!"));
      }
      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Mật khẩu xác nhận không chính xác !"));
      }
      user.password = req.body.newPassword;
      await user.save();
      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//find user info
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//all user
router.get(
  "/admin-all-users",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.find({ role: "user" }).sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
