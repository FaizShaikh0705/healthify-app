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