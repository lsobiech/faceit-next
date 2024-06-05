// store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import { postSlice } from './postSlice'
import { userSlice } from './userSlice'

const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
    users: userSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
