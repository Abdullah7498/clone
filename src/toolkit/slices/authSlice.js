import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../api/Api";
import toast from "react-hot-toast";

export const LoginUser = createAsyncThunk("Login", async (data) => {
  try {
    const res = await Api.post("/login", data);
    return res.data;
  } catch (err) {
    toast.error(err.response.data.error);
  }
});
export const SignUpUser = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await Api.post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("SignUp Error:", error);

      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }

      // Reject the promise with the error value
      return rejectWithValue(
        error.response ? error.response.data : "Network Error"
      );
    }
  }
);
const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      toast.success(action.payload.message);
      state.loading = false;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.user = null;
      state.token = null;
      state.loading = false;
    });
    builder.addCase(LoginUser.pending, (state) => {
      state.loading = true;
    });
  },
});
export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
