const express = require("express");
const path = require("path");
const router = express.Router();
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const Shop = require("../model/shop");
const { isSeller, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendShopToken = require("../utils/shopToken");
const { upload } = require("../multer");
const fs = require("fs");
const Product = require("../model/product");
//create-shop
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Đang xóa file" });
        }
      });

      return next(
        new ErrorHandler("Email đã được dùng để đăng ký cửa hàng khác !", 500)
      );
    }
    // Kiểm tra xác nhận mật khẩu
    if (req.body.password.length < 6) {
      return next(
        new ErrorHandler("Mật khẩu phải có độ dài lớn hơn 6 ký tự !", 400)
      );
    }

    if (req.body.password.trim() !== req.body.confirm.trim()) {
      return next(new ErrorHandler("Mật khẩu xác nhận không khớp !", 400));
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const seller = {
      name: req.body.name,
      shopName: req.body.shopName,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      description: req.body.description,
      phoneNumber: req.body.phoneNumber,
      avatar: {
        public_id: fileUrl,
        url: fileUrl,
      },
    };
    const sellerActivationToken = createSellerActivationToken(seller);
    const activationUrl = `http://localhost:3000/seller/activation/${sellerActivationToken}`;
    try {
      await sendMail({
        email: seller.email,
        subject: "Kích hoạt tài khoản",
        message: `Xin chào ${seller.name}, vui lòng nhấn vào liên kết bên dưới để kích hoạt tài khoản cửa hàng của bạn: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Vui lòng kiểm tra email:- ${seller.email} !`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
//create seller activationtoken
const createSellerActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};
//Activation Shop
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { seller_activation_token } = req.body;
      const newSeller = jwt.verify(
        seller_activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newSeller) {
        return next(new ErrorHandler("Mã xác thực lỗi", 400));
      }
      const {
        name,
        email,
        password,
        avatar,
        phoneNumber,
        address,
        description,
        shopName,
      } = newSeller;
      let seller = await Shop.findOne({ email });
      if (seller) {
        return next(new ErrorHandler("Người dùng đã tồn tại", 400));
      }
      seller = await Shop.create({
        name,
        email,
        password,
        avatar,
        shopName,
        description,
        address,
        phoneNumber,
      });
      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//Login shop
router.post(
  "/shop-login",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password.trim()) {
        return next(new ErrorHandler("Vui lòng nhập đầy đủ thông tin!", 400));
      }
      const seller = await Shop.findOne({ email }).select("+password");
      if (!seller) {
        return next(new ErrorHandler("Người dùng không tồn tại", 400));
      }
      const isPasswordValid = await seller.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Mật khẩu không chính xác", 400));
      }
      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//Load seller
router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);
      if (!seller) {
        return next(new ErrorHandler("Người dùng không tồn tại", 404));
      }
      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//logout shop
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
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
// get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//update shop avatar
router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Xóa avatar cũ của cửa hàng
      const existsShop = await Shop.findById(req.seller.id);
      const existsAvatarPath = `uploads/${existsShop.avatar.url}`;
      fs.unlinkSync(existsAvatarPath);

      // Cập nhật avatar mới của cửa hàng
      const fileUrl = path.join(req.file.filename);
      const updatedShop = await Shop.findByIdAndUpdate(req.seller.id, {
        avatar: { public_id: fileUrl, url: fileUrl },
      });

      // Cập nhật avatar của cửa hàng cho tất cả sản phẩm thuộc cửa hàng
      await Product.updateMany(
        { shopId: req.seller.id },
        {
          $set: {
            "shop.avatar.public_id": fileUrl,
            "shop.avatar.url": fileUrl,
          },
        }
      );

      res.status(200).json({
        success: true,
        updatedShop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update seller info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber } = req.body;

      const shop = await Shop.findOne(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("Không tìm thấy người dùng", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.get(
  "/admin-all-sellers",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        sellers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
