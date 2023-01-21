// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserForm } from '../types/types'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/',
    prepareHeaders: async (headers, { getState, endpoint }: any) => {
      const token = getState()?.auth?.accessToken;
      console.log(token,'token')
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({

  }),

})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
