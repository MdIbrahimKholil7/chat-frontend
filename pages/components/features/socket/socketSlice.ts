import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    activeUsers: []
}

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        addActiveUsers: (state, action) => {
            console.log(action.payload)
            state.activeUsers = action.payload
        },
    },
});

export const { addActiveUsers } = socketSlice.actions;
export default socketSlice.reducer;
