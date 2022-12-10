import { createSlice } from "@reduxjs/toolkit";
import { Users } from "../../types/types";

interface State {
    messages: any | []
}

const initialState: State = {
    messages: [{}],
};

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        getMessages: (state, action) => {

            state.messages = [...state?.messages,...action?.payload];
        },
        resetMessages: (state, action) => {
            state.messages = [];
        },
    },
});

export const { getMessages,resetMessages} = messagesSlice.actions;
export default messagesSlice.reducer;