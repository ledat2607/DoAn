const express = require("express");
const Shop = require("../model/shop");
const { isSeller, isAuthenticated } = require("../middleware/auth");
const CoupounCode = require("../model/couponCode");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();

//create coupon code
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.find({ code: req.body.code });
      if (couponCode.length !== 0) {
        return next(new ErrorHandler("Mã khuyến mãi đã tồn tại", 402));
      }

      const coupon = await CoupounCode.create(req.body);
      res.status(201).json({
        success: true,
        coupon,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//get all coupouns
router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CoupounCode.find({ shopId: req.seller.id });
      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
//get all coupon code for user
router.get(
  "/get-all-coupon/:id/:name",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.params.id;
      const name = req.params.name;
      const couponCodes = await CoupounCode.find({
        shopId,
        selectedProduct: name,
      });
      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
//delete coupoun
router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Mã khuyến mãi không tồn tại!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Xóa thành công !",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
//get coupon code value its code
router.get(
  "/get-coupon-value/:code",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const coupon = await CoupounCode.findOne({ code: req.params.code });
      res.status(201).json({
        success: true,
        coupon,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;
