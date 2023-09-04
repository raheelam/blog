import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IPost } from "../app/types"

export interface IPostState {
  post: IPost | null
  posts: IPost[] | null
  postComments?: any[] | null
}

const initialState: IPostState = {
  post: null,
  posts: null,
  postComments: null,
}

export const postSlice = createSlice({
  initialState,
  name: "postSlice",
  reducers: {
    resetPost: (state) => {
      state.post = initialState.post
    },
    setPost: (state, action: PayloadAction<IPost>) => {
      state.post = action.payload
    },
    resetPosts: (state) => {
      state.posts = initialState.posts
    },
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload
    },
    appendToPosts: (state, action: PayloadAction<IPost>) => {
      state.posts = state.posts
        ? [action.payload, ...state.posts]
        : [action.payload]
    },
    removeFromPosts: (state, action: PayloadAction<string>) => {
      if (state.posts) {
        state.posts = state.posts.filter(
          (post) => post.id.toString() !== action.payload.toString(),
        )
      }
    },
    updatePost: (state, action: PayloadAction<IPost>) => {
      if (state.posts) {
        state.posts = state.posts.map((post) => {
          if (post.id.toString() === action.payload.id.toString()) {
            return action.payload
          }
          return post
        })
      }
    },
    setPostComments: (state, action: PayloadAction<any[]>) => {
      state.postComments = action.payload
    },
  },
})

export default postSlice.reducer

export const {
  resetPost,
  appendToPosts,
  setPost,
  setPosts,
  resetPosts,
  setPostComments,
  removeFromPosts,
  updatePost,
} = postSlice.actions
