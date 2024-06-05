// store/postSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../interfaces";

interface PostState {
  posts: Post[];
  page: number;
  hasMore: boolean;
}

const initialState: PostState = {
  posts: [],
  page: 1,
  hasMore: true,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = [...state.posts, ...action.payload];
    },
    prependPost: (state, action: PayloadAction<Post>) => {
      state.posts = [action.payload, ...state.posts];
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
  },
});

export const { addPosts, prependPost, incrementPage, setHasMore } =
  postSlice.actions;
export default postSlice.reducer;
