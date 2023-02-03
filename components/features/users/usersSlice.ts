import { createSlice } from "@reduxjs/toolkit";
import { friend, Users } from "../../types/types";

interface State {
    users: any
}

const initialState: State = {
    users: [],
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUsers: (state, action) => {
         
            state.users = action?.payload;
        },
        updateUsersMessage: (state, action) => {
            if (action.payload.sender) {

                const index = state.users.findIndex((d: Users) => d.friendInfo._id === action?.payload?.sender);
                state.users[index].lastMsg.message = action?.payload?.message;
            }
            if (action.payload.receiver) {
                const index = state.users.findIndex((d: Users) => d.friendInfo._id === action?.payload?.receiver);
                state.users[index].lastMsg.message = action?.payload?.message;
            }
        },
        updateSenderMessage: (state, action) => {
           
            if (action.payload.receiver) {
                const index = state.users.findIndex((d: Users) => d.friendInfo._id === action?.payload?.receiver);
             
                state.users[index].lastMsg.message = action?.payload?.message;
            }
        },
    },
});

export const { addUsers, updateUsersMessage, updateSenderMessage } = usersSlice.actions;
export default usersSlice.reducer;

