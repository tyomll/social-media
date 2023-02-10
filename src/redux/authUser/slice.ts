import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface InitialStateType {
  username: string | null;
  email: string | null;
  token: string | null;
  id: string | null;
}
const initialState: InitialStateType = {
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
      state.username = action.payload.username
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeAuthUser(state) {
      state.username = null;
      state.email = null;
      state.token = null;
      state.id = null;
    }
  }
})

export const { setAuthUser, removeAuthUser } = authUser.actions

export default authUser.reducer; 