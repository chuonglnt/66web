// ************ Start Import ************
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import appStateSlice from "@/lib/redux/features/appStateSlice";
// ************ End Import ************
// ************ Start Import Reducer ************
import userReducer from "@/lib/redux/features/userSlice";
import userLoginReducer from "@/lib/redux/features/loginUserSlice";
import loginFormSlice from "@/lib/redux/features/loginFormSlice";
import authReducer from "@/lib/redux/features/authSlice";
// ************ End Import Reducer ************

const rootReducer = combineReducers({
  // ************ Định Nghĩa Reducer ************
  appState: appStateSlice,
  user: userReducer,
  userLogin: userLoginReducer,
  loginForm: loginFormSlice,
  auth: authReducer,
});
// ************ Start Setup Redux Store ************
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["loginForm", "userLogin"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// ************ End Setup Redux Store ************
