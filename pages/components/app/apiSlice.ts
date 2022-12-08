// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserForm } from '../types/types'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery  ({ 
    baseUrl: 'http://localhost:8080/',
    prepareHeaders: async (headers, { getState, endpoint }) => {
      // const token = getState()?.auth?.accessToken;
      // if (token) {
      //     headers.set("Authorization", `Bearer ${token}`);
      // }
      console.log('getState',getState)
      console.log('endPoint',endpoint)
      return headers;
  },
  }),
  endpoints: (builder) => ({

  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
