import { createSlice } from "@reduxjs/toolkit";

interface State{
    accessToken:string | undefined,
    user:undefined | {}
}

const initialState:State = {
    accessToken: undefined,
    user: undefined,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            console.log(action.payload)
            state.accessToken = action.payload.data?.token;
            state.user = action.payload.data?.result;
        },
        userLoggedOut: (state) => {
            state.accessToken = undefined;
            state.user = undefined;
        },
    },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;