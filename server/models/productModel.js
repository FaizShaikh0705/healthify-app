import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        postPositionNo: {
            type: String, // Change the type based on your actual data type
            required: true
        },
        postImage: {
            type: [String], // Change the type based on your actual data type
            required: true
        },
        postTopicName: {
            type: String,
            required: true
        },
        postPriceName: {
            type: String,
            required: true
        },
        postPriceName2: {
            type: String,
            required: true
        },
        postVariantName1: {
            type: String,
            required: true
        },
        postVariantName2: {
            type: String,
            required: true
        },
        postLongDetail: {
            type: String,
            required: true
        },
        postIsActiveStatus: {
            type: String,
            required: true
        },
        postusername: {
            type: String,
            required: true
        },
    }, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema)
export default Product