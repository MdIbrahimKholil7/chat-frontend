// import { apiSlice } from "../../app/apiSlice";
import { MessageAdd, notification } from "../../types/types";

import { useCookies } from 'react-cookie';
import apiSlice from "../../app/apiSlice";

interface FetchArgs extends RequestInit {
    url: string;
    params?: Record<string, any>;
    body?: any;
    responseHandler?: 'json' | 'text' | ((response: Response) => Promise<any>);
    validateStatus?: (response: Response, body: any) => boolean;
    result?: any
    totalNotification?: number
}

export const messageSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addMessage: builder.mutation<FetchArgs, any>({
            query: (data: MessageAdd) => ({
                url: "/api/v1/message/addMessage",
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled

                } catch (error) {
                    console.log(error)
                }
            }
        }),
        getMessages: builder.query<FetchArgs, void>({
            query: (id) => `/api/v1/message/getMessages/${id}`,
        }),
        addNotification: builder.mutation<FetchArgs, any>({
            query: (data: notification) => ({
                url: "/api/v1/notification",
                method: "POST",
                body: data
            }),
        }),
        getNotification: builder.query<FetchArgs, void>({
            query: (id) => `/api/v1/notification/${id}`,
        }),
        resetNotifications: builder.query<FetchArgs, void>({
            query: (id) => `/api/v1/notification/update/${id}`,
        })
    })
})

export const { useAddMessageMutation, useGetMessagesQuery, useAddNotificationMutation, useGetNotificationQuery, useResetNotificationsQuery } = messageSlice
