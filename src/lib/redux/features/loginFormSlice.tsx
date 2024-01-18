import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface LoginFormState {
  email: string;
  password: string;
}

const initialState: LoginFormState = {
  email: "",
  password: "",
};

export const loginFormSlice = createSlice({
  name: "loginForm",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    // ... setPassword và các reducers khác
  },
});

export const { setEmail, setPassword } = loginFormSlice.actions;
export default loginFormSlice.reducer;
