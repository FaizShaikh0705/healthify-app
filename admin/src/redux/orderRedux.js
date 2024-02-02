import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        currentOrder: null,
        isPlacingOrder: false,
        placeOrderError: null,
    },
    reducers: {
        resetPlaceOrderError: (state) => {
            state.placeOrderError = null;
        },
        placeOrderStart: (state) => {
            state.isPlacingOrder = true;
            state.placeOrderError = null;
        },
        placeOrderSuccess: (state, action) => {
            state.isPlacingOrder = false;
            state.currentOrder = action.payload;
        },
        placeOrderFailure: (state, action) => {
            state.isPlacingOrder = false;
            state.placeOrderError = action.payload;
        },
        resetPlaceOrderError: (state) => {
            state.placeOrderError = null;
        },

        // setDeliveryCharges: (state, action) => {
        //     state.currentOrder.deliveryCharge = action.payload
        // },
        // setMop: (state, action) => {
        //     state.currentOrder.mop = action.payload
        // },
    },
});

export const {
    placeOrderStart,
    placeOrderSuccess,
    placeOrderFailure,
    resetPlaceOrderError,
    // setDeliveryCharge,
    // setMop,
} = orderSlice.actions;

export default orderSlice.reducer;
