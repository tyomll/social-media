import { configureStore } from '@reduxjs/toolkit';
import authUser from './authUser/slice'

export const store = configureStore({
  reducer: {
    authUser,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch