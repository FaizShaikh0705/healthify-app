import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        products: [
            {
                productId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                postImage: {
                    type: [String],
                },
                postTopicName: {
                    type: String,
                },
                postLongDetail: {
                    type: String,
                },
                selectedVariantName: {
                    type: String,
                },
                selectedVariantPrice: {
                    type: String,
                },
            }
        ],
        amount: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        address: {
            type: Object,
            required: true
        },
        deliveryCharge: {
            type: String,
        },
        mop: {
            type: String,
        },
        status: {
            type: String,
            default: "pending",
        }
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model('Order', orderSchema)
export default Order