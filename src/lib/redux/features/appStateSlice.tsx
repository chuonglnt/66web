// appStateSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const appStateSlice = createSlice({
  name: "appState",
  initialState: {
    isLoading: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload.isError;
      state.errorMessage = action.payload.message;
    },
    // ... các reducers khác
  },
});

export const { setLoading, setError } = appStateSlice.actions;

export default appStateSlice.reducer;
