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
        }),
    })
})

export const { useAddMessageMutation } = messageSlice

