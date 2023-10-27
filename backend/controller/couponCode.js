const express = require("express");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const Shop = require("../model/shop");
const ErrorHandle = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const CouponCode = require("../model/couponCode");
const router = express.Router();

//create coupon code
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const couponCode = await CouponCode.find({ code: req.body.code });
      if (couponCode) {
        return next(new ErrorHandle("Mã khuyến mãi đã tồn tại", 402));
      }
      const coupon = await CouponCode.create(req.body);
      res.status(201).json({
        success: true,
        coupon,
      });
    } catch (error) {
      return next(new ErrorHandle(error.message, 400));
    }
  })
);
module.exports = router;
