import { loginFailure, loginStart, loginSuccess, registerStart, registerSuccess, registerFailure, } from "./userRedux";
import { logout as logoutAction } from "./userRedux";
import { userRequest ,publicRequest} from '../requestMethods';
import { getProductStart, getProductSuccess, getProductFailure } from './productRedux'
import { placeOrderStart, placeOrderSuccess, placeOrderFailure, resetPlaceOrderError, } from './orderRedux'
import { createAsyncThunk } from "@reduxjs/toolkit"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
}

export const register = async (dispatch, user) => {
    dispatch(registerStart());
    try {
        const res = await publicRequest.post("/auth/register", user);
        dispatch(registerSuccess(res.data));
    } catch (err) {
        dispatch(registerFailure());
    }
}

export const logout = async (dispatch) => {
    dispatch(logoutAction());
}

export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
    }
};

// export const placeOrder = async (dispatch) => {
//     dispatch(placeOrderStart());
//     try {
//         const response = await userRequest.post("/orders")
//         dispatch(placeOrderSuccess(response));
//     } catch (error) {
//         dispatch(placeOrderFailure(error));
//     }
// }

export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await userRequest.post("/orders", orderData);
            return response.data; // Assuming the server returns the order details
        } catch (error) {
            return rejectWithValue(error.response.data); // Return the error payload
        }
    }
);


export const razorPost = createAsyncThunk(
    'order/onlinePay',
    async (orderData, { rejectWithValue }) => {
        try {
            const response = await userRequest.post("/paylink", orderData);
            return response.data; // Assuming the server returns the order details
        } catch (error) {
            return rejectWithValue(error.response.data); // Return the error payload
        }
    }
);
