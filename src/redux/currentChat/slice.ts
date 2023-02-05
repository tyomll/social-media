import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface InitialStateType {
  id: string | null
}
const initialState: InitialStateType = {
  id: null
}

const currentChat = createSlice({
  name: 'currentChat',
  initialState,
  reducers: {
    setCurrentChat(state: InitialStateType, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  }
})

export const { setCurrentChat } = currentChat.actions

export default currentChat.reducer; 