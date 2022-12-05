import { apiSlice } from "../../app/apiSlice";
import { UserForm } from "../../types/types";
import { userLoggedIn } from "./authSlice";
import { useCookies } from 'react-cookie';

export const authSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query: (data: UserForm) => ({
                url: "/api/v1/user/post",
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }){
                const result = await queryFulfilled;
                
                dispatch(userLoggedIn(result.data))
            }
        })
    })
})

export const { useAddUserMutation } = authSlice

