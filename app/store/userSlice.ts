import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../interfaces";

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<User[]>) => {
      state.users = [...state.users, ...action.payload];
    },
  },
});

export const { addUsers } = userSlice.actions;
export default userSlice.reducer;
