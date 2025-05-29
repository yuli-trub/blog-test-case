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
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (searchTerm?: string) => {
    return await fetchPostsAPI(searchTerm);
  }
);

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
      const update = (post?: Post | null) => {
        if (!post) return;
        if (!post.liked) {
          post.reactions.like += 1;
          post.liked = true;
          if (post.disliked) {
            post.reactions.dislike -= 1;
            post.disliked = false;
          }
        } else {
          post.reactions.like -= 1;
          post.liked = false;
        }
      };

      update(state.selectedPost);
      const post = state.posts.find((p) => p.id === action.payload);
      update(post);
    },
    toggleDislike(state, action: PayloadAction<number>) {
      const update = (post?: Post | null) => {
        if (!post) return;
        if (!post.disliked) {
          post.reactions.dislike += 1;
          post.disliked = true;
          if (post.liked) {
            post.reactions.like -= 1;
            post.liked = false;
          }
        } else {
          post.reactions.dislike -= 1;
          post.disliked = false;
        }
      };

      update(state.selectedPost);
      const post = state.posts.find((p) => p.id === action.payload);
      update(post);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = "succeeded";
        state.posts = action.payload.map((post) => {
          const existing = state.posts.find((p) => p.id === post.id);
          return {
            ...post,
            liked: existing?.liked ?? false,
            disliked: existing?.disliked ?? false,
            reactions: existing?.reactions ?? {
              like: Math.floor(Math.random() * 50),
              dislike: Math.floor(Math.random() * 50),
            },
          };
        });
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
          const rawPost = action.payload;

          const existing = state.posts.find((p) => p.id === rawPost.id);

          const post: Post = {
            ...rawPost,
            liked: existing?.liked ?? false,
            disliked: existing?.disliked ?? false,
            reactions: existing?.reactions ?? {
              like: Math.floor(Math.random() * 50),
              dislike: Math.floor(Math.random() * 50),
            },
          };

          state.selectedPost = post;
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
