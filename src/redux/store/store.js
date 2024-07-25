import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice"
import paymentReducer from "../slice/paymentSlice";
export const store = configureStore({
    reducer:{
        auth: authReducer,
        payment: paymentReducer,
    },
})