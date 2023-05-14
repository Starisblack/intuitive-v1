import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signUserOut, login } from "./authAPI";

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

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {})
      .addCase(loginAsync.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.user = { ...action.payload };
        state.isAuth = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
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

export const { logout } = counterSlice.actions;
export const isAuth = (state: any) => state.auth.isAuth;
export const user = (state: any) => state.auth.user;
export const error = (state: any) => state.auth.error;
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default counterSlice.reducer;
