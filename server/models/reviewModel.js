import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        UserName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        postLongDetail: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            enum: [0, 1],
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
