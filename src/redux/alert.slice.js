import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alert: null,
}

const alertSlice = createSlice({
    name: alert,
    initialState,
    reducers: {
        showAlert (state, action) {
            return {
                ...state,
                alert: action.payload
            };
        },
        hideAlert (state, action) {
            return {
                ...state,
                alert: null
            };
        }
    }
})

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;