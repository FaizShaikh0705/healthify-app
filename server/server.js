import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import dietRoutes from './routes/dietRoutes.js'

dotenv.config();
const app = express()

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connection Sucessfull'))
    .catch((err) => {
        console.log(err);
    })

app.use(cors());
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/diet', dietRoutes)

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log('Backend server is running', PORT)
})