import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../../firebase';

export interface InitialStateType {
  userID: string | null
  chatID: string | null,

}
const initialState: InitialStateType = {
  userID: null,
  chatID: null
}

const currentChat = createSlice({
  name: 'currentChat',
  initialState,
  reducers: {
    setCurrentChat(state: InitialStateType, action: PayloadAction<string>) {
      state.userID = action.payload;
      state.chatID = auth.currentUser!.uid > state.userID ? auth.currentUser!.uid + state.userID : state.userID + auth.currentUser!.uid
    },
  }
})

export const { setCurrentChat } = currentChat.actions

export default currentChat.reducer; 