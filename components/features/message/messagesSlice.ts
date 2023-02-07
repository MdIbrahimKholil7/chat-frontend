import { createSlice } from "@reduxjs/toolkit";
import { Message, msgNotification, Users } from "../../types/types";



interface State {
    messages: any | [],
    typingMessage: Message | {},
    notificationMsg: msgNotification[],
    totalNotifications: number
}

const initialState: State = {
    messages: [{}],
    typingMessage: {},
    notificationMsg: [],
    totalNotifications: 0
};

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        getMessages: (state, action) => {

            state.messages = [...state?.messages, ...action?.payload];
        },
        resetMessages: (state, action) => {
            state.messages = [];
        },
        typingMessage: (state, action) => {
            state.typingMessage = action.payload;
        },
        notificationMessage: (state, action) => {
         

            if (state.notificationMsg.length === 0) {
                state.notificationMsg.push({
                    _id: action.payload._id,
                    total: action.payload.total,
                    name: action.payload.name
                })
                state.totalNotifications = 1
                return
            }
            const result = state.notificationMsg.map(d => {
                if (d._id === action.payload._id) {
                    d.total += 1
                    state.totalNotifications += 1
                    return d
                }
                return d
            })

            state.notificationMsg = result
        },
        addNotificationFromDb: (state, action) => {
            state.notificationMsg = action.payload?.result
            state.totalNotifications = action.payload?.total
        },

        resetAllNotificationFromDb: (state) => {
            state.notificationMsg = []
            state.totalNotifications = 0
        },

    },
});

export const { getMessages, resetMessages, typingMessage, notificationMessage, addNotificationFromDb, resetAllNotificationFromDb } = messagesSlice.actions;
export default messagesSlice.reducer;





