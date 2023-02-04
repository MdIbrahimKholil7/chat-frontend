// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserForm } from '../types/types'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
 const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mern-chat-backend-two.vercel.app/',
    prepareHeaders: async (headers, { getState, endpoint }: any) => {
      const token = getState()?.auth?.accessToken;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({

  }),

})
export default apiSlice
// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
