import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ReactionType = "like" | "dislike";

interface ReactionState {
  [postId: number]: {
    like: number;
    dislike: number;
    userReaction: ReactionType | null;
  };
}

const initialState: ReactionState = {};

const reactionsSlice = createSlice({
  name: "reactions",
  initialState,
  reducers: {
    initializeReactions: (state, action: PayloadAction<{ postId: number }>) => {
      const { postId } = action.payload;
      if (!state[postId]) {
        state[postId] = {
          like: Math.floor(Math.random() * 51),
          dislike: Math.floor(Math.random() * 51),
          userReaction: null,
        };
      }
    },
    reactToPost: (
      state,
      action: PayloadAction<{ postId: number; type: ReactionType }>
    ) => {
      const { postId, type } = action.payload;
      const current = state[postId];
      if (!current) return;

      const opposite = type === "like" ? "dislike" : "like";

      if (current.userReaction === opposite) {
        current[opposite]--;
      }

      if (current.userReaction === type) {
        current[type]--;
        current.userReaction = null;
      } else {
        current[type]++;
        current.userReaction = type;
      }
    },
  },
});

export const { initializeReactions, reactToPost } = reactionsSlice.actions;
export default reactionsSlice.reducer;
