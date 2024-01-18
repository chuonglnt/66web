// ************ Start Import ************
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetByUid } from "@/Services/Base-Service";
import { signInWithEmailAndPassword, getAuth, getIdToken } from "firebase/auth";
import { Gender } from "@/Core/Global-Enums";
import { UserModel } from "@/Core/Base-Model";
import { formatDateTime } from "@/Core/Utils";
// ************ End Import ************
// ************ Start Interface ************

interface LoginData {
  email: string;
  password: string;
}

interface UserLoginState {
  token: string | null;
  uid: string | null;
  isLoading: boolean;
  isError: boolean;
}
const initialState: UserLoginState = {
  token: null,
  uid: null,
  isLoading: false,
  isError: false,
};
// ************ End Interface ************
// Định nghĩa async thunk
export const fetchLoginUser = createAsyncThunk(
  "user/fetchLoginUser",
  (loginData: LoginData, { rejectWithValue }) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const token = await (userCredential.user?.getIdToken?.() ?? null);
        const uid = user?.uid ?? "";
        const userItem = (await GetByUid("users", uid)) as UserModel;
        if (!userItem) {
          return rejectWithValue({ message: "User not found" });
        }
        localStorage.setItem("token", token ?? "");
        localStorage.setItem(
          "dataInfo",
          JSON.stringify({
            displayName: userItem.displayName,
            firstName: userItem.firstName,
            photoUrl: userItem.photoUrl,
          })
        );
        return { userItem, token, uid, isLoading: false, isError: false };
      })
      .catch((error) => {
        console.error("Catch error:", error);
        return rejectWithValue({ message: error.message });
      });
  }
);

// ************ userLoginSlice ************
export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    setTokenAndUid: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.uid = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.uid = action.payload.uid;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchLoginUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setTokenAndUid } = userLoginSlice.actions;
export default userLoginSlice.reducer;
