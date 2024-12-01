import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
    error: null,
};

const slicesAut = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = null;
        },
        signOut: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.error = null;
        },
        signError: (state, action) => {
            state.isAuthenticated = false;
            state.token = null;
            state.user = null;
            state.error = action.payload;
        },
        set: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { signIn, signOut, signError, set } = slicesAut.actions;

export default slicesAut.reducer;