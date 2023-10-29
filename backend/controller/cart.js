const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const User = require("../model/user");
const Cart = require("../model/cart");
const fs = require("fs");

//add to cart
router.post(
  "/add-to-cart",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { userId, productId, shopId, qty } = req.body;
      const shop = await Shop.findById(shopId);
      const user = await User.findById(userId);
      const product = await Product.findById(productId);

      // Tìm sản phẩm trong giỏ hàng với userId, shopId, và productId cụ thể
      const cartData = await Cart.findOne({
        productId,
        shopId,
        userId,
      });

      if (cartData) {
        // Nếu sản phẩm đã tồn tại, tăng qty bằng số lượng mới
        const updatedCartItem = await Cart.findByIdAndUpdate(
          cartData._id,
          { qty: cartData.qty + qty },
          { new: true }
        );
        res.status(200).json({
          success: true,
          updatedData: updatedCartItem,
        });
      } else {
        // Nếu sản phẩm chưa tồn tại, tạo một bản ghi mới
        const newData = await Cart.create({
          userId,
          shopId,
          productId,
          qty,
          user,
          shop,
          product,
        });
        res.status(200).json({
          success: true,
          newData,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

//get all item in cart with user
router.get(
  "/get-items-in-cart-of-user/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.params.id;
      const cartItems = await Cart.find({ userId });
      if (!cartItems) {
        return next(
          new ErrorHandler("Giỏ hàng người dùng không tồn tại !", 400)
        );
      }
      res.status(200).json({
        success: true,
        cartItems,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
module.exports = router;
