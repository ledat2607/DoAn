const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const Shop = require("../model/shop");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../model/user");
const Whishlist = require("../model/wishlist");

//add to cart
router.post(
  "/add-to-wishlist",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { userId, productId, shopId } = req.body;
      const shop = await Shop.findById(shopId);
      const user = await User.findById(userId);
      const product = await Product.findById(productId);

      // Tìm sản phẩm trong giỏ hàng với userId, shopId, và productId cụ thể
      const wishlistData = await Whishlist.findOne({
        productId,
        shopId,
        userId,
      });
      if (wishlistData) {
        return next(
          new ErrorHandler("Sản phẩm đã có trong danh sách yêu thích !")
        );
      }
      // Nếu sản phẩm chưa tồn tại, tạo một bản ghi mới
      const newData = await Whishlist.create({
        userId,
        shopId,
        productId,
        user,
        shop,
        product,
      });
      res.status(200).json({
        success: true,
        newData,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

//get all item in cart with user
router.get(
  "/get-items-in-wishlist-of-user/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.params.id;
      const wishlistItems = await Whishlist.find({ userId });
      if (!wishlistItems) {
        return next(
          new ErrorHandler(
            "Danh sách yêu thích của người dùng không tồn tại !",
            400
          )
        );
      }
      res.status(200).json({
        success: true,
        wishlistItems,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//delete product in cart
router.post(
  "/delete-items-in-wishlist/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const wishlistId = req.params.id;
      const isExists = await Whishlist.findByIdAndDelete(wishlistId);
      if (!isExists) {
        return next(new ErrorHandler("Sản phẩm không có danh sách !", 400));
      }

      res.status(200).json({
        success: true,
        message: "Xóa khỏi danh sách yêu thích thành công !",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
