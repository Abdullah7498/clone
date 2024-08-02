import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { Api } from "../../api/Api";

export const CreatePost = createAsyncThunk(
  "post/createPost",
  async (data, { rejectWithValue }) => {
    try {
      const res = await Api.post("/CreatePost", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const GetPost = createAsyncThunk(
  "post/getPost",
  async (data, { rejectWithValue }) => {
    try {
      const res = await Api.get(`/getPosts?userId=${data}`);
      return res.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const res = await Api.delete(`deletePost/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response
          ? error.response.data
          : { message: "An unknown error occurred" }
      );
    }
  }
);

export const LikePost = createAsyncThunk(
  "post/likepost",
  async (data, { rejectWithValue }) => {
    try {
      const res = await Api.post(`/posts/${data?.postId}/like/`, {
        userId: data?.userId,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(
        error.response
          ? error.response.data
          : { message: "An unknown error occurred" }
      );
    }
  }
);

const PostSlice = createSlice({
  name: "post",
  initialState: {
    posts: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        toast.success(action.payload.message || "Posts fetched successfully");
      })
      .addCase(GetPost.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message || "Failed to fetch posts");
      })
      .addCase(CreatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreatePost.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message);
      })
      .addCase(CreatePost.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.error || "Failed to create post");
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.error || "Failed to delete post");
      });
  },
});

export default PostSlice.reducer;
