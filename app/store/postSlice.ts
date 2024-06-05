import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../interfaces";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (page: number) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=2`);
    return response.data;
  }
);

interface PostState {
  posts: Post[];
  page: number;
  hasMore: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  page: 1,
  hasMore: true,
  status: "idle",
  error: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = "succeeded";
        const newPosts = action.payload.filter(
          (post) => !state.posts.find((p) => p.id === post.id)
        );
        state.posts = [...state.posts, ...newPosts];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { incrementPage, setHasMore } = postSlice.actions;
export default postSlice.reducer;
