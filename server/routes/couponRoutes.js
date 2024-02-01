import express from 'express'
const router = express.Router()

import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} from './verifyToken.js'
import Coupon from '../models/couponModel.js';


//Create
// router.post("/", verifyToken, async (req, res) => {
router.post("/", async (req, res) => {
    const newCoupon = new Coupon(req.body);

    try {
        const savedCoupon = await newCoupon.save();
        res.status(200).json(savedCoupon);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
// router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
router.put("/:id", async (req, res) => {
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCoupon);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
//router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
router.delete("/:id", async (req, res) => {
    try {
        await Coupon.findByIdAndDelete(req.params.id);
        res.status(200).json("Coupon has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET Coupon 
// router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
router.get("/find/:userId", async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ userId: req.params.userId });
        res.status(200).json(coupon);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //GET ALL
// router.get("/", verifyTokenAndAdmin, async (req, res) => {
router.get("/", async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    } catch (err) {
        res.status(500).json(err);
    }
});



export default router