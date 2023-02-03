import { createSlice } from "@reduxjs/toolkit";

interface State {
    accessToken: string | undefined,
    user: undefined | {},
    img:string|undefined
}

const initialState: State = {
    accessToken: undefined,
    user: undefined,
    img:undefined
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.accessToken = action?.payload?.data?.token;
            state.user = action?.payload?.data?.result;
        },
        userLoggedOut: (state) => {
            state.accessToken = undefined;
            state.user = undefined;
        },
        addImg: (state,action) => {
            state.img = action.payload;
          
        },
    },
});


export const { userLoggedIn, userLoggedOut,addImg } = authSlice.actions;
export default authSlice.reducer;