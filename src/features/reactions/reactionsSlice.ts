import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ReactionType = "like" | "dislike";

interface ReactionEntry {
  liked: boolean;
  disliked: boolean;
  reactions: {
    like: number;
    dislike: number;
  };
}

interface ReactionState {
  [postId: number]: ReactionEntry;
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
          liked: false,
          disliked: false,
          reactions: {
            like: Math.floor(Math.random() * 50),
            dislike: Math.floor(Math.random() * 50),
          },
        };
      }
    },
    toggleReaction: (
      state,
      action: PayloadAction<{ postId: number; type: ReactionType }>
    ) => {
      const { postId, type } = action.payload;
      const post = state[postId];
      if (!post) return;

      const isLike = type === "like";
      const likedKey = isLike ? "liked" : "disliked";
      const oppositeKey = isLike ? "disliked" : "liked";

      if (post[likedKey]) {
        post.reactions[type]--;
        post[likedKey] = false;
      } else {
        post.reactions[type]++;
        post[likedKey] = true;

        if (post[oppositeKey]) {
          post.reactions[isLike ? "dislike" : "like"]--;
          post[oppositeKey] = false;
        }
      }
    },
  },
});

export const { initializeReactions, toggleReaction } = reactionsSlice.actions;
export default reactionsSlice.reducer;
