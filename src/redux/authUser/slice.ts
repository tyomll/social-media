import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface InitialStateType {
  avatar: string | null;
  username: string | null;
  email: string | null;
  token: string | null;
  id: string | null;
}
const initialState: InitialStateType = {
  avatar: null,
  username: null,
  email: null,
  token: null,
  id: null,
}

const authUser = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthUser(state: InitialStateType, action: PayloadAction<InitialStateType>) {
      state.avatar = action.payload.avatar
      state.username = action.payload.username
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeAuthUser(state) {
      state.avatar = null;
      state.username = null;
      state.email = null;
      state.token = null;
      state.id = null;
    }
  }
})

export const { setAuthUser, removeAuthUser } = authUser.actions

export default authUser.reducer; 