import express from 'express'
import DietPlan from '../models/deitModel.js'
import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} from './verifyToken.js'
const router = express.Router()

//Create
// router.post("/", verifyToken, async (req, res) => {
router.post("/", async (req, res) => {
    const newDietPlan = new DietPlan(req.body);

    try {
        const savedDietPlan = await newDietPlan.save();
        res.status(200).json(savedDietPlan);
    } catch (err) {
        res.status(500).json(err);
    }
});


//UPDATE
// router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
router.put("/:id", async (req, res) => {
    try {
        const updatedDietPlan = await DietPlan.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedDietPlan);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
//router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
router.delete("/:id", async (req, res) => {
    try {
        await DietPlan.findByIdAndDelete(req.params.id);
        res.status(200).json("DietPlan has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET DietPlan 
// router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
router.get("/:healthIssue/:weightGoal", async (req, res) => {
    let healthIssue = decodeURIComponent(req.params.healthIssue.replace(/-/g, ' '));
    let weightGoal = decodeURIComponent(req.params.weightGoal.replace(/%20/g, ' '));
    console.log(weightGoal)
    try {
        const dietPlans = await DietPlan.find({ for: healthIssue, type: weightGoal });
        res.status(200).json(dietPlans);
        console.log(dietPlans)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// //GET ALL
// router.get("/", verifyTokenAndAdmin, async (req, res) => {
router.get("/", async (req, res) => {
    try {
        const dietPlan = await DietPlan.find();
        res.status(200).json(dietPlan);
    } catch (err) {
        res.status(500).json(err);
    }
});


export default router