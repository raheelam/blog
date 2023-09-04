import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  appendToPosts,
  removeFromPosts,
  setPost,
  setPostComments,
  setPosts,
  updatePost,
} from "../features/postSlice"
import { IPost } from "../app/types"

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getPostById: builder.query<IPost, string>({
      query: (id) => `posts/${id}`,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setPost(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    getPostComments: builder.query<any[], string>({
      query: (id) => `posts/${id}/comments`,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          setPostComments(data)
        } catch (error) {
          console.log(error)
        }
      },
    }),
    createPost: builder.mutation<IPost, Omit<IPost, "id">>({
      query: (post: Omit<IPost, "id">) => {
        return {
          method: "POST",
          url: "posts",
          body: post,
        }
      },
      transformResponse(result: IPost) {
        const changedId = (Number(result.id) + Date.now()).toString()
        const modifiedPost = { ...result, id: changedId }
        return modifiedPost
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          dispatch(appendToPosts(data))
          dispatch(setPost(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    deletePost: builder.mutation<IPost, string>({
      query: (id: string) => {
        return {
          method: "DELETE",
          url: `posts/${id}`,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(removeFromPosts(args))
          dispatch(setPost(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    updatePost: builder.mutation<IPost, [id: string, payload: IPost]>({
      query: ([id, payload]) => {
        return {
          method: "PATCH",
          url: `posts/${id}`,
          body: payload,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log("hidiiiiii", args[0])
          dispatch(updatePost({ ...data, id: args[0] }))
          dispatch(setPost({ ...data, id: args[0] }))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    getAllPosts: builder.query<IPost[], any>({
      query: (params?: any) => ({ url: `posts`, params }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setPosts(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
  }),
})

export const {
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useGetPostCommentsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi
