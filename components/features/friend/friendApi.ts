import apiSlice from "../../app/apiSlice";
import { UserForm } from "../../types/types";
// import { userLoggedIn } from "./authSlice";
import { useCookies } from 'react-cookie';

interface FetchArgs extends RequestInit {
    url: string;
    params?: Record<string, any>;
    body?: any;
    responseHandler?: 'json' | 'text' | ((response: Response) => Promise<any>);
    // validateStatus?: (response: Response, body: any) => boolean;
}

export const friendsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<FetchArgs, void>({
            query: () => `/getAllUser`
        }),
    })
})


export const { useGetUserQuery } = friendsSlice

