import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authUser: (state, action) => {
            state.isAuth = true; 
        },
        notAuthUser: (state, action) => {
            state.isAuth = false; 
        },
    },
});

export const { authUser, notAuthUser } = authSlice.actions; 

export default authSlice.reducer;
