import { configureStore } from '@reduxjs/toolkit'
// import { jokeApi } from './app/apiSlice'
import { setupListeners } from '@rtk-incubator/rtk-query'
import apiSlice from '../app/apiSlice'
import authSliceReducer from '../features/auth/authSlice'
import friendSliceReducer from '../features/friend/friendSlice'
import messagesSliceReducer from '../features/message/messagesSlice'
import socketSliceReducer from '../features/socket/socketSlice'
import userSliceReducer from '../features/users/usersSlice'
import menuSliceReducer from '../features/menuBar/menuSlice'

// import { jokeApi } from './services/jokes'

const store = configureStore({
    reducer: {

        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        friend: friendSliceReducer,
        message: messagesSliceReducer,
        activeUser: socketSliceReducer,
        users: userSliceReducer,
        menu: menuSliceReducer,
    },

    devTools: process.env.NODE_ENV !== "production",

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiSlice.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export default store
