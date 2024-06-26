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
            type: String,
        },
        weight: {
            type: String,
        },
        height: {
            type: String,
        },
        age: {
            type: String,
        },
        healthIssues: {
            type: [String],
        },
        weightGoal: {
            type: String,
            enum: ['loss', 'gain'],
        },
        targetWeight: {
            contact: String,
        },
        bmical: [{
            weight: String,
            bmi: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }],
        exerciseFrequency: {
            type: String,
        },
        mealsPerDay: {
            type: Number,
        },
        dietRating: {
            type: String,
        },
        restaurantFrequency: {
            type: String,
        },
        vegetarian: {
            type: String,
            enum: ['vegetarian_meals', 'non_vegetarian_meals']
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