const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const Event = require("../model/event");
const fs = require("fs");
//create event
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Lỗi !", 400));
      } else {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.filename}`);
        const eventData = req.body;
        eventData.images = imageUrls;
        eventData.shop = shop;

        const event = await Event.create(eventData);
        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//get all events
router.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });
      res.status(202).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
//delete product shop
router.delete(
  "/delete-shop-event/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const eventData = await Event.findByIdAndDelete(productId);
      eventData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
      const event = await Event.findByIdAndDelete(productId);
      if (!event) {
        return next(new ErrorHandler("Sự kiện không tồn tại !", 404));
      }
      res.status(201).json({
        success: true,
        message: "Xóa sự kiện thành công !",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 404));
    }
  })
);
module.exports = router;
