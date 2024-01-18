import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";
import { UserModel } from "@/Core/Base-Model";
import {
  GetById,
  GetAll,
  Delete,
  Update,
  Create,
  UploadFile,
} from "@/Services/Base-Service";
import { Gender } from "@/Core/Global-Enums";
import { formatDateTime } from "@/Core/Utils";

export interface UpdateUserPayload {
  currentUserId: string;
  dataItem: UserModel;
  file?: File | null;
}
// Define a type for the slice state
interface UserState {
  dataObj: UserModel[];
  dataItem: {
    [key: string]: any;
    id?: string;
    uid?: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDay: string;
    gender: Gender;
    defaultAddress: string;
    shippingAddress: string;
    displayName: string;
    phoneNumber: string;
    photoUrl: string;
    createdAt: string;
    updatedAt: string;
    emailVerified: boolean;
    isdeleted: boolean;
    // additionalInfo?: Record<string, any>;
  };
  currentUserId: string;
  currentUserUid?: string;
  isLoading: boolean;
  isError: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  dataObj: [],
  dataItem: {
    id: "",
    uid: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDay: "",
    gender: "" || Gender.Male || Gender.Female || Gender.Other,
    defaultAddress: "",
    shippingAddress: "",
    displayName: "",
    phoneNumber: "",
    photoUrl: "/assets/images/avata-default.jpg",
    createdAt: formatDateTime(new Date()),
    updatedAt: formatDateTime(new Date()),
    emailVerified: false,
    isdeleted: false,
  },
  currentUserId: "",
  currentUserUid: "",
  isLoading: false,
  isError: false,
};

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    const response = await GetAll("users");
    return response;
  }
);
export const fetchUserById = createAsyncThunk(
  "user/fetchUserDetail",
  async (currentUserId: string, { rejectWithValue }) => {
    try {
      const response = await GetById("users", currentUserId);
      return response as UserModel;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchUserDetailByUid = createAsyncThunk(
  "user/fetchUserDetail",
  async (currentUserUid: string, { rejectWithValue }) => {
    try {
      const response = await GetById("users", currentUserUid);
      return response as UserModel;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchDeleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string, { rejectWithValue }) => {
    try {
      await Delete("users", id);
    } catch (error) {
      // Xử lý lỗi và trả về rejectWithValue nếu cần
      return rejectWithValue(error);
    }
  }
);
export const fetchUpdateUser = createAsyncThunk(
  "users/updateUser",
  async (
    { currentUserId, dataItem, file }: UpdateUserPayload,
    { rejectWithValue }
  ) => {
    try {
      let fileUrl;
      if (file) {
        fileUrl = await UploadFile(
          file,
          `images/user_avarta/${currentUserId}/${file.name}`
        );
        // Thêm fileUrl vào dataItem nếu cần
        dataItem = { ...dataItem, photoUrl: fileUrl };
      }
      const updatedUser = await Update<UserModel>(
        "users",
        currentUserId,
        dataItem
      );
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserField: (
      state,
      action: PayloadAction<{ field: string; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.dataItem[field] = value;
    },
    setCurrentUserId: (state, action: PayloadAction<string>) => {
      state.currentUserId = action.payload;
    },
    setUserDetail: (state, action: PayloadAction<UserModel>) => {
      state.dataItem = action.payload;
    },
    getAllUsers: (state, action) => {
      state.dataObj = action.payload;
    },
    createUser: (state, action) => {
      state.dataObj.push(action.payload);
    },
    getlUserById: (state, action) => {
      const userDetail = state.dataObj.find(
        (user) => user.id === action.payload
      );
    },
    getlUserByUid: (state, action) => {
      const userDetail = state.dataObj.find(
        (user) => user.uid === action.payload
      );
    },
    updateUser: (state, action) => {
      const index = state.dataObj.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.dataObj[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.dataObj = state.dataObj.filter(
        (user) => user.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      // ************ GET ALL USERS ************
      .addCase(fetchAllUsers.pending, (state) => {
        // Add user to the state array
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.dataObj = action.payload as UserModel[];
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      // ************ GET USER BY ID ************
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<UserModel>) => {
          state.isLoading = false;
          state.isError = false;
          state.dataItem = action.payload;
        }
      )
      .addCase(fetchUserById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      // ************ GET USER BY UID ************
      // .addCase(fetchUserDetailByUid.pending, (state) => {
      //   state.isLoading = true;
      //   state.isError = false;
      // })
      // .addCase(
      //   fetchUserDetailByUid.fulfilled,
      //   (state, action: PayloadAction<UserModel>) => {
      //     state.isLoading = false;
      //     state.isError = false;
      //     state.dataItem = action.payload;
      //   }
      // )
      // .addCase(fetchUserDetailByUid.rejected, (state) => {
      //   state.isLoading = false;
      //   state.isError = true;
      // })
      // ************ DELETE ************

      .addCase(fetchDeleteUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchDeleteUser.fulfilled, (state, action: PayloadAction) => {
        state.isLoading = false;
        state.isError = false;
        state.dataObj = state.dataObj.filter(
          (user) => user.id !== action.payload
        );
      })
      .addCase(fetchDeleteUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      // ************ UPDATE ************
      .addCase(fetchUpdateUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        fetchUpdateUser.fulfilled,
        (state, action: PayloadAction<UserModel>) => {
          state.isLoading = false;
          state.isError = false;
          state.dataItem = action.payload;
        }
      )
      .addCase(fetchUpdateUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {
  getAllUsers,
  createUser,
  getlUserById,
  getlUserByUid,
  updateUser,
  deleteUser,
  updateUserField,
  setCurrentUserId,
  setUserDetail,
} = usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUsers = (state: RootState) => state.user.dataObj;

export default usersSlice.reducer;
