import { createSlice } from "@reduxjs/toolkit";
import { Users } from "../../types/types";

interface State {
    friend: undefined | Users
}

const initialState: State = {
    friend: undefined,
};

const friendSlice = createSlice({
    name: "friend",
    initialState,
    reducers: {
        addFriend: (state, action) => {
            state.friend = action?.payload;
        },

    },
});

export const { addFriend } = friendSlice.actions;
export default friendSlice.reducer;