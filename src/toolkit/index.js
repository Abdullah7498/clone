import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import PostSlice from "./slices/PostSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: PostSlice,
  },
});
