import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            address: String,
            postalCode: String,
            city: String,
            state: String,
        },
        contact: {
            contact: String,
        },
        weight: {
            contact: String,
        },
        height: {
            contact: String,
        },
        age: {
            contact: String,
        },
        healthIssues: {
            contact: [String],
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

export default User