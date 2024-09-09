import { createSlice } from "@reduxjs/toolkit";
import { AUTHENTICATE, CHECKING, NOT_AUTHENTICATED } from "src/utils";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: CHECKING,
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        handleChecking: (state) => {
            state.status = CHECKING;
            state.user = {};
            state.errorMessage = undefined;
        },
        handleLogin: (state, { payload }) => {
            state.status = AUTHENTICATE;
            state.user = payload;
            state.errorMessage = undefined;
        },
        handleLogout: (state, { payload }) => {
            state.status = NOT_AUTHENTICATED;
            state.user = {};
            state.errorMessage = payload;
        },
        handleClearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
    },
});

export const {
    handleChecking,
    handleLogin,
    handleLogout,
    handleClearErrorMessage,
} = authSlice.actions;
