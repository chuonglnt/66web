// ************ Start Import ************
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetByUid } from "@/Services/Base-Service";
import { UserModel } from "@/Core/Base-Model";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { signIn } from "@/Services/LogIn-Service";
import { auth } from "@/lib/firebase/firebase.config";
import { signOut } from "firebase/auth";
import { notifyError, notifySuccess } from "@/Components/Notification-Messages";
import { FirebaseError } from "firebase/app";
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
// ************ Fetch Sign In ************

export const fetchSignIn = createAsyncThunk(
  "user/fetchSignIn",
  async ({ email, password }: LoginData, { rejectWithValue }) => {
    try {
      const userCredential = await signIn(email, password);
      if (userCredential) {
        const userAuth = userCredential.user;
        const uid = userAuth?.uid ?? "";
        const userItem = (await GetByUid("users", uid)) as UserModel;
        localStorage.setItem(
          "dataInfo",
          JSON.stringify({
            uid: userItem.uid,
            email: userItem.email,
            displayName: userItem.displayName,
            firstName: userItem.firstName,
            photoUrl: userItem.photoUrl,
          })
        );
        notifySuccess("Bạn đã đăng nhập thành công!");
        return {
          userAuth,
          userItem,
          uid,
          isLoading: false,
          isError: false,
        };
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        // Xử lý dựa trên mã lỗi cụ thể
        switch (error.code) {
          case "auth/user-not-found":
            notifyError("Không tìm thấy người dùng với email này.");
            break;
          case "auth/wrong-password":
            notifyError("Mật khẩu không chính xác.");
            break;
          case "auth/invalid-email":
            notifyError("Email không hợp lệ.");
            break;
          case "auth/too-many-requests":
            notifyError(
              "Đã có quá nhiều yêu cầu không hợp lệ từ địa chỉ IP của bạn."
            );
            break;
          case "auth/user-disabled":
            notifyError("Tài khoản của bạn đã bị vô hiệu hóa.");
            break;
          case "auth/email-already-exists":
            notifyError("Email đã tồn tại.");
            break;
          case "auth/invalid-credential":
            notifyError("Thông tin đăng nhập không hợp lệ.");
          // Thêm các trường hợp lỗi khác mà bạn muốn xử lý
          default:
            notifyError("Đã xảy ra lỗi khi đăng nhập666. Vui lòng thử lại");
            console.error("Đã xảy ra lỗi khi đăng nhập:", error.message);
        }
      } else {
        // Xử lý các lỗi không phải từ Firebase
        notifyError("Đã xảy ra lỗi khi đăng nhập777. Vui lòng thử lại");
        console.error("Đã xảy ra lỗi:", error);
      }
    }
    return rejectWithValue({ message: "User not found" });
  }
);
// ************ Fetch Sign Out ************

export const fetchSignOut = createAsyncThunk(
  "user/fetchSignOut",
  async (_, { rejectWithValue }) => {
    await signOut(auth)
      .then(() => {
        // Đăng xuất thành công
        console.error("Đăng xuất thành công");
      })
      .catch((error) => {
        rejectWithValue(error);
        console.error("Lỗi khi đăng xuất:", error);
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
      .addCase(fetchSignIn.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        if (action.payload) {
          state.uid = action.payload.uid;
          state.isLoading = false;
          state.isError = false;
        }
      })
      .addCase(fetchSignIn.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchSignOut.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchSignOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchSignOut.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setTokenAndUid } = userLoginSlice.actions;
export default userLoginSlice.reducer;
