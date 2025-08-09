const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const { isSeller } = require("../middleware/auth");
const { fs } = require("fs");
const CoupounCode = require("../model/coupounCode");
const coupounCode = require("../model/coupounCode");

router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCoupounCodeExists = await CoupounCode.find({
        name: req.body.name,
      });
      if (isCoupounCodeExists) {
        return next(new ErrorHandler("Coupoun Code Already Exists", 400));
      }
      const coupounCode = await CoupounCode.create(req.body);
      res.status(201).json({
        success: true,
        coupounCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all coupons of a shop
router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CoupounCode.find({
        shop: {
          _id: req.params.id,
        },
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

// coupon code by its value
router.get("/get-coupon-value/:name",catchAsyncErrors(async(req,res,next)=>{
   try {
    const couponcode = await CoupounCode.findOne({name: req.params.name});
    res.status(200).json({
      success: true,
      couponcode,
    })
   } catch (error) {
      return next(new ErrorHandler(error, 400));
    
   }
}))

module.exports = router;
