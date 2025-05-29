import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./features/posts/postsSlice";
import reactionsReducer from "./features/reactions/reactionsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    reactions: reactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
