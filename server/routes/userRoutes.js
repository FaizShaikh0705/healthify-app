import express from 'express'
import User from "../models/userModel.js";
import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} from './verifyToken.js'
const router = express.Router()

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER
router.get("/find/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL USER
// router.get("/", verifyTokenAndAdmin, async (req, res) => {
router.get("/", async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE user's address during checkout
// router.put("/checkout/:id", verifyTokenAndAuthorization, async (req, res) => {
router.put("/personalquestions/:id", async (req, res) => {
    try {
        const { address, contact } = req.body;

        // Optionally, encrypt the address or perform any necessary validation

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: { address, contact },
            },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/bodymeasures/:id", async (req, res) => {
    try {
        const { weight, height, age } = req.body;

        // Optionally, encrypt the address or perform any necessary validation

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: { weight, height, age },
            },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/healthissues/:id", async (req, res) => {
    try {
        const { healthIssues } = req.body;

        // Optionally, encrypt the address or perform any necessary validation

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: { healthIssues },
            },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/weightgoal/:id", async (req, res) => {
    try {
        const { weightGoal, targetWeight, exerciseFrequency, mealsPerDay, dietRating, restaurantFrequency, vegetarian } = req.body;

        // Optionally, encrypt the address or perform any necessary validation

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: { weightGoal, targetWeight, exerciseFrequency, mealsPerDay, dietRating, restaurantFrequency, vegetarian },
            },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.put("/weightgoal/:id", async (req, res) => {
//     try {
//         const { exerciseFrequency, mealsPerDay, dietRating, restaurantFrequency, vegetarian } = req.body;

//         // Optionally, encrypt the address or perform any necessary validation

//         const updatedUser = await User.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $set: { exerciseFrequency, mealsPerDay, dietRating, restaurantFrequency, vegetarian },
//             },
//             { new: true }
//         );

//         res.status(200).json(updatedUser);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.put("/bmi/:id", async (req, res) => {
    try {
        const { weight, bmi } = req.body;

        // Optionally, encrypt the address or perform any necessary validation

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $push: { bmical: { weight, bmi } },
            },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/stats/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Sort the BMI data array by createdAt timestamp in descending order
        user.bmical.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const latestBMI = user.bmical[0];

        res.status(200).json(latestBMI);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});


router.get("/bmical/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const bmiValues = await User.findById(userId);
        res.status(200).json(bmiValues);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
});



export default router