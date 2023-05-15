import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUserOut, login, signUp } from "./authAPI";

type AuthState = {
  id: string;
  isAuth: any;
  user: any;
  loading: boolean;
  error: any;
};

const initialState: AuthState = {
  id: "",
  isAuth: false,
  user: null,
  loading: false,
  error: "",
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (userInput: any, { dispatch, rejectWithValue }) => {
    try {
      const user = await login(userInput);
      return user.user;
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
      console.log(user)
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await signUserOut();
      dispatch(logout());
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
    },
    setError: (state, action) => {
      state.error = action.payload
    },

    clearError: (state) => {
      state.error = null
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => { state.loading = true})
      .addCase(loginAsync.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.user = { ...action.payload };
        state.isAuth = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.payload;
        state.loading = false
      })
      .addCase(signUpAsync.pending, (state) => { state.loading = true})
      .addCase(signUpAsync.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload
      
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.payload;
      })
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
        state.user = false;
      });
  },
});

// trackUserAuth

export const { logout, setError, clearError } = authSlice.actions;
export const isAuth = (state: any) => state.auth.isAuth;
export const user = (state: any) => state.auth.user;
export const error = (state: any) => state.auth.error;
export const loadingStatus = (state: any) => state.auth.loading;


export default authSlice.reducer;
