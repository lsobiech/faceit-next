import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../interfaces";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    );
    return response.data;
  }
);

export const checkMorePosts = createAsyncThunk(
  "posts/checkMorePosts",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${
        page + 1
      }&_limit=${limit}`
    );
    return response.data.length > 0;
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId: number) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    return response.data;
  }
);

interface PostState {
  posts: Post[];
  post: Post | null;
  page: number;
  hasMore: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  highlightedPostId: number | null;
}

const initialState: PostState = {
  posts: [],
  post: null,
  page: 1,
  hasMore: true,
  status: "idle",
  error: null,
  highlightedPostId: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    resetPage: (state) => {
      state.page = 1;
      state.hasMore = true;
      state.posts = [];
    },
    addNewPost: (state, action: PayloadAction<Post>) => {
      state.posts = [action.payload, ...state.posts];
      state.highlightedPostId = action.payload.id;
    },
    clearHighlight: (state) => {
      state.highlightedPostId = null;
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
        if (newPosts.length > 0) {
          state.page += 1;
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPostById.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.status = "succeeded";
          state.post = action.payload;
        }
      )
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(
        checkMorePosts.fulfilled,
        (state, action: PayloadAction<boolean>) => {
          state.hasMore = action.payload;
        }
      );
  },
});

export const { incrementPage, resetPage, addNewPost, clearHighlight } =
  postSlice.actions;
export default postSlice.reducer;
