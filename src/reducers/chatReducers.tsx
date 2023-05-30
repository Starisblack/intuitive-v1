import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUserOut, login, signUp } from "./authAPI";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import db from "../firebase-config";

type ChatState = {
  chatId: string;
  user: {};
  chatNotification: number
};

const initialState: ChatState = {
  chatId: "null",
  user: {},
  chatNotification: 0
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,

  reducers: {
    sendNotification: (state, action )=> {
        state.chatNotification = action.payload
    },
    clearChat: (state) => {
        state.chatId = "null",
        state.user  = ""
    },
    changeUser: (state, action) => {
        state.user = action.payload.user
       state.chatId = action.payload.currentUser.uid > action.payload.user.uid
          ? action.payload.currentUser.uid + action.payload.user.uid
          : action.payload.user.uid + action.payload.currentUser.uid
    },
  },
});

// trackUserAuth

export const { changeUser, clearChat, sendNotification } = chatSlice.actions;

export const chatId = (state: any) => state.chat.chatId;
export const userSelected = (state: any) => state.chat.user;
export const chatNotification = (state: any) => state.chat.chatNotification;
export default chatSlice.reducer;
