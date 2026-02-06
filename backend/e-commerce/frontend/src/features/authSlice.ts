import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: true
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload,
                state.loading = false
        },
        removeUser: (state) => {
            state.user = null
        }
    }
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;