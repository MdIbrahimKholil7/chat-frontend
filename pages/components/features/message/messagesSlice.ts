import { createSlice } from "@reduxjs/toolkit";
import { Message, Users } from "../../types/types";

interface State {
    messages: any | [],
    typingMessage: Message | {}
}

const initialState: State = {
    messages: [{}],
    typingMessage: {}
};

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        getMessages: (state, action) => {
            console.log(action.payload, 'payload')
            state.messages = [...state?.messages, ...action?.payload];
        },
        resetMessages: (state, action) => {
            state.messages = [];
        },
        typingMessage: (state, action) => {
            state.typingMessage = action.payload;
        },
    },
});

export const { getMessages, resetMessages, typingMessage } = messagesSlice.actions;
export default messagesSlice.reducer;