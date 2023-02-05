import { configureStore } from '@reduxjs/toolkit';
import authUser from './authUser/slice'
import currentChat from './currentChat/slice'

export const store = configureStore({
  reducer: {
    authUser,
    currentChat,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch