import { apiSlice } from "../../app/apiSlice";
import { UserForm } from "../../types/types";
import { userLoggedIn } from "./authSlice";
import { useCookies } from 'react-cookie';

interface FetchArgs extends RequestInit {
    url: string;
    params?: Record<string, any>;
    body?: any;
    responseHandler?: 'json' | 'text' | ((response: Response) => Promise<any>);
    validateStatus?: (response: Response, body: any) => boolean;
}

export const authSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addUser: builder.mutation<FetchArgs, any>({
            query: (data: UserForm) => ({
                url: "/api/v1/user/post",
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const result = await queryFulfilled;

                dispatch(userLoggedIn(result.data))
            }
        }),
        loginUser: builder.mutation<FetchArgs, any>({
            query: (data: UserForm) => ({
                url: "/api/v1/user/login",
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const result = await queryFulfilled;
                dispatch(userLoggedIn(result))
            }
        }),
        getUserInformation: builder.query<FetchArgs, void>({
            query: () => "/api/v1/user/getUser",
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const result = await queryFulfilled;
                dispatch(userLoggedIn(result))
            }
        }),
        getAllUser: builder.query<FetchArgs, void>({
            query: () => "/api/v1/user/getAllUser",
        }),
    })
})

export const { useAddUserMutation, useLoginUserMutation, useGetUserInformationQuery, useGetAllUserQuery } = authSlice

