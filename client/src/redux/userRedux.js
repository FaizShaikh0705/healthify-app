import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
        },

        // Registration reducers
        registerStart: (state) => {
            state.isFetching = true;
            state.error = false; // Reset any previous errors
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        registerFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        resetRegistrationError: (state) => {
            state.error = false;
        },

        // New action to set the user's address
        setAddress: (state, action) => {
            state.currentUser.address = action.payload;
        },

        setContact: (state, action) => {
            state.currentUser.contact = action.payload;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    registerStart,
    registerSuccess,
    registerFailure,
    resetRegistrationError,
    setAddress,
    setContact,
} = userSlice.actions;
export default userSlice.reducer;