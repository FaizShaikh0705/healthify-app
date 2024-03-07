import mongoose from 'mongoose';

const dietPlanSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Weight Loss', 'Weight Gain', 'Maintenance'],
        // required: true
    },
    for: {
        type: String,
        enum: ['Diabetes Patient', 'Cholesterol Patient', 'Thyroid Patient'],
        // required: true
    },
    meals: {
        early_morning: [String],
        breakfast: [String],
        mid_morning: [String],
        lunch: [String],
        evening_snacks: [String],
        dinner: [String],
        bed_time: [String]
    }
});

const DietPlan = mongoose.model('DietPlan', dietPlanSchema);

export default DietPlan;
