import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    activeUsers: [],
    callUser:false,
    resetCall:false
}

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        addActiveUsers: (state, action) => {
            state.activeUsers = action.payload
        },
        addCallUser:(state,action)=>{
            state.callUser=action.payload
        },
        resetCallUser:(state,action)=>{
            state.resetCall=action.payload
        }
    },
});

export const { addActiveUsers,resetCallUser,addCallUser } = socketSlice.actions;
export default socketSlice.reducer;

