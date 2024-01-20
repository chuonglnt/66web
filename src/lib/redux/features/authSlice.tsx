import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload = true;
    },
    setUnAuthentication: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload = false;
    },
  },
});

export const { setAuthentication, setUnAuthentication } = authSlice.actions;

export default authSlice.reducer;
