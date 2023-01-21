import { apiSlice } from "../../app/apiSlice";
import { MessageAdd } from "../../types/types";

import { useCookies } from 'react-cookie';

interface FetchArgs extends RequestInit {
    url: string;
    params?: Record<string, any>;
    body?: any;
    responseHandler?: 'json' | 'text' | ((response: Response) => Promise<any>);
    validateStatus?: (response: Response, body: any) => boolean;
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
    })
})

export const { useAddMessageMutation, useGetMessagesQuery } = messageSlice
