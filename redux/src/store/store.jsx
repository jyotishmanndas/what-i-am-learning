import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from "../features/toggleSlice"
import authSlice from "../features/authSlice"
import cartSlice from "../features/cartSlice"

export default configureStore({
    reducer: {
        toggle: toggleSlice,
        auth: authSlice,
        cart: cartSlice
    }
})