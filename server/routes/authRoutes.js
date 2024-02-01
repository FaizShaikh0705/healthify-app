import express from 'express'
import userModel from '../models/userModel.js'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
const router = express.Router()

//Register
router.post('/register', async (req, res) => {
    const newUser = new userModel({
        userName: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Login
router.post('/login', async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        // !user && 
        if(!user){
            return res.status(401).json("Wronge credentails!");
        }

        const hashedpassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)

        const originalPassword = hashedpassword.toString(CryptoJS.enc.Utf8)
        originalPassword !== req.body.password && res.status(401).json("Wronge credentails!")

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC,
            { expiresIn: "30d" })

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router