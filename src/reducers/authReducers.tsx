import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUserOut, login, signUp } from "./authAPI";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import db from "../firebase-config";

type AuthState = {
  isAuth: any;
  user: any;
  loading: boolean;
  signoutLoading:  boolean;
  error: any;
};

const initialState: AuthState = {
  isAuth: false,
  user: null,
  loading: false,
  signoutLoading: false,
  error: "",
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (userInput: any, { dispatch, rejectWithValue }) => {
    try {
      const userId = await login(userInput);
      const userRef = doc(db, "users", userId);
      onSnapshot(userRef, (doc) => {
        const userData: any = doc.data();
        dispatch(authSuccess(userData));
      });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signUpAsync = createAsyncThunk(
  "auth/signUp",
  async (userInput: any, { dispatch, rejectWithValue }) => {
    try {
      const user = await signUp(userInput);
      const userRef = doc(db, "users", user.uid);
      onSnapshot(userRef, (doc) => {
        const userData: any = doc.data();
        dispatch(authSuccess(userData));
      });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, {rejectWithValue }) => {
    try {
    const res =  await signUserOut();
      // dispatch(logout());
      return res
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    authSuccess: (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state: any, action: any) => {
        // state.loading = false;
        // state.user = { ...action.payload };
        // state.isAuth = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signUpAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpAsync.fulfilled, (state: any, action: any) => {
        // state.loading = false;
        // state.isAuth = true;
        // state.user = action.payload;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.payload;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.signoutLoading = true;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.user = null;
        state.isAuth = false;
        state.signoutLoading = false;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.signoutLoading = false;
        state.isAuth = false;
        state.user = null;
      });
  },
});

// trackUserAuth

export const {setError, clearError, authSuccess } = authSlice.actions;
export const isAuth = (state: any) => state.auth.isAuth;
export const user = (state: any) => state.auth.user;
export const error = (state: any) => state.auth.error;
export const loadingStatus = (state: any) => state.auth.loading;
export const signoutLoading = (state: any) => state.auth.signoutLoading;

export default authSlice.reducer;
