import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUserOut, login, signUp } from "./authAPI";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import db from "../firebase-config";

type ChatState = {
  chatId: string;
  user: {};
};

const initialState: ChatState = {
  chatId: "null",
  user: {},
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {
    changeUser: (state, action) => {
      const selectedUserId = action.payload.user.uid
        ? action.payload.user.uid
        : action.payload.user.id;
        state.user = action.payload.user
       state.chatId = action.payload.currentUser.id > selectedUserId
          ? action.payload.currentUser.id + selectedUserId
          : selectedUserId + action.payload.currentUser.id
    },
  },
});

// trackUserAuth

export const { changeUser } = chatSlice.actions;

export const chatId = (state: any) => state.chat.chatId;
export const userSelected = (state: any) => state.chat.user;
export default chatSlice.reducer;
