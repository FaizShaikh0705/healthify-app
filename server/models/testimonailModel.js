import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        postImage: {
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

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
