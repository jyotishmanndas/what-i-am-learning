import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from "../features/toggleSlice"
import authSlice from "../features/authSlice"

export default configureStore({
    reducer: {
        toggle: toggleSlice,
        auth: authSlice
    }
})