import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  fetchPosts as fetchPostsAPI,
  fetchPostById as fetchPostByIdAPI,
} from "../../api/posts";
import type { Post } from "../../types/Post";

interface PostsState {
  posts: Post[];
  selectedPost: Post | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  status: "idle",
  error: null,
};

// fetching
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return await fetchPostsAPI();
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: number) => {
    return await fetchPostByIdAPI(id);
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<number>) {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        if (!post.liked) {
          post.reactions.like += 1;
          post.liked = true;
          if (post.disliked) {
            post.disliked = false;
            post.reactions.dislike -= 1;
          }
        } else {
          post.reactions.like -= 1;
          post.liked = false;
        }
      }

      // updating for single post
      if (state.selectedPost?.id === action.payload) {
        postsSlice.caseReducers.toggleLike(state, action);
      }
    },
    toggleDislike(state, action: PayloadAction<number>) {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        if (!post.disliked) {
          post.reactions.dislike += 1;
          post.disliked = true;
          if (post.liked) {
            post.liked = false;
            post.reactions.like -= 1;
          }
        } else {
          post.reactions.dislike -= 1;
          post.disliked = false;
        }
      }
      // updating for single post
      if (state.selectedPost?.id === action.payload) {
        postsSlice.caseReducers.toggleDislike(state, action);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Ошибка при загрузке постов";
      })
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPostById.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.status = "succeeded";
          state.selectedPost = action.payload;
        }
      )
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Ошибка при загрузке поста";
      });
  },
});

export const { toggleLike, toggleDislike } = postsSlice.actions;
export default postsSlice.reducer;
