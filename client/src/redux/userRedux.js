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

        // New action to set the user's weight
        setWeight: (state, action) => {
            state.currentUser.weight = action.payload;
        },

        // New action to set the user's height
        setHeight: (state, action) => {
            state.currentUser.height = action.payload;
        },

        // New action to set the user's age
        setAge: (state, action) => {
            state.currentUser.age = action.payload;
        },
        setHealthIssues: (state, action) => {
            state.currentUser.healthIssues = action.payload;
        },
        setWeightGoal: (state, action) => {
            state.currentUser.weightGoal = action.payload;
        },
        setTargetWeight: (state, action) => {
            state.currentUser.targetWeight = action.payload;
        },
        setBMI: (state, action) => {
            state.currentUser.bmi = action.payload;
        },
        setExerciseFrequency: (state, action) => {
            state.currentUser.exerciseFrequency = action.payload;
        },
        setMealsPerDay: (state, action) => {
            state.currentUser.mealsPerDay = action.payload;
        },
        setDietRating: (state, action) => {
            state.currentUser.dietRating = action.payload;
        },
        setRestaurantFrequency: (state, action) => {
            state.currentUser.restaurantFrequency = action.payload;
        },
        setVegetarian: (state, action) => {
            state.currentUser.vegetarian = action.payload;
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
    setWeight,
    setHeight,
    setAge,
    setHealthIssues,
    setWeightGoal,
    setTargetWeight,
    setBMI,
    setExerciseFrequency,
    setMealsPerDay,
    setDietRating,
    setRestaurantFrequency,
    setVegetarian,
} = userSlice.actions;
export default userSlice.reducer;