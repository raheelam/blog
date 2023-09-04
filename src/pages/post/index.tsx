import { Link, useNavigate, useParams } from "react-router-dom"
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostByIdQuery,
  useGetPostCommentsQuery,
  useUpdatePostMutation,
} from "../../redux/api/postApi"
import { useForm } from "../../shared/hooks"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { RiDeleteBinFill } from "react-icons/ri"
import { MdModeEdit } from "react-icons/md"
import { BiArrowBack } from "react-icons/bi"
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks"
import { setPost } from "../../redux/features/postSlice"
import { Button } from "./components/Button"
import { DoubleClickToEditTextArea } from "./components/DoubleClickToEditTextArea"
import { CommentsBox } from "./components/CommentBox"

const initialValue = {
  body: "",
  title: "",
}

const Post = () => {
  const params = useParams()
  const dispatch = useAppDispatch()
  const id = params.id!
  const navigate = useNavigate()
  const { error, isLoading } = useGetPostByIdQuery(id)
  const post = useAppSelector((state) => state.postState.post)
  const posts = useAppSelector((state) => state.postState.posts)
  const { data: postComments, isLoading: isloadingComments } =
    useGetPostCommentsQuery(id)

  const [
    createPost,
    {
      data: createdPost,
      isLoading: isCreatePostLoading,
      isError: isCreatePostError,
      error: createPostError,
      isSuccess: isCreatePostSuccess,
    },
  ] = useCreatePostMutation()
  const [
    deletePost,
    {
      isLoading: isDeletePostLoading,
      isError: isDeletePostError,
      error: deletePostError,
      isSuccess: isDeletePostSuccess,
    },
  ] = useDeletePostMutation()
  const [
    updatePost,
    {
      isLoading: isUpdatePostLoading,
      isError: isUpdatePostError,
      error: updatePostError,
      isSuccess: isUpdatePostSuccess,
    },
  ] = useUpdatePostMutation()

  const { formValue, handleInputChange, setFormValue } = useForm(initialValue)

  useEffect(() => {
    setFormValue({ title: post?.title, body: post?.body, userId: post?.userId })
  }, [post, setFormValue])

  useEffect(() => {
    if ((error as any)?.status === 404) {
      //just mock fetching because creation doesnt really work with the endpoints given
      const selectedPost = posts?.filter((p) => p.id == id)
      if (selectedPost) dispatch(setPost(selectedPost[0]))
    }
  }, [error])

  useEffect(() => {
    if (isDeletePostSuccess) {
      toast.success("Post successfully deleted", {
        position: "top-right",
      })
      navigate("/")
    }
  }, [isDeletePostSuccess])

  useEffect(() => {
    if (isCreatePostSuccess) {
      toast.success("Post successfully created", {
        position: "top-right",
      })

      navigate(`/`)
    }
  }, [isCreatePostSuccess])
  useEffect(() => {
    if (isUpdatePostSuccess) {
      toast.success("Post successfully updated", {
        position: "top-right",
      })
    }
  }, [isUpdatePostSuccess])

  return (
    <div className="flex text-black  flex-wrap relative  w-full  gap-[2rem] py-5  ">
      <Link
        className="h-[46px] w-[46px] flex justify-center items-center bg-gray-200 rounded-full "
        to="/"
      >
        <BiArrowBack className="w-1/2 h-1/2" />
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        className="flex w-full lg:w-[45%] gap-[0.5rem] flex-col"
      >
        <div className="flex h-[46px] justify-between items-center">
          <p className="font-bold text-lg">Posts</p>
          <Button
            onClick={() => {
              createPost(formValue)
            }}
            className="bg-primary hover:bg-blue-800"
          >
            + New Post
          </Button>
        </div>

        <div className="flex gap-[5px]  flex-col">
          <label className="font-bold" htmlFor="title">
            Title{" "}
          </label>
          <DoubleClickToEditTextArea
            id="title"
            name="title"
            onChange={(e) => handleInputChange(e, "title")}
            className="font-bold"
            value={formValue.title}
          />
        </div>
        <div className="flex gap-[5px] mt-5 flex-col">
          <label className="font-bold" htmlFor="detail">
            Detail
          </label>
          <DoubleClickToEditTextArea
            id="detail"
            name="detail"
            onChange={(e) => handleInputChange(e, "body")}
            value={formValue.body}
          ></DoubleClickToEditTextArea>
        </div>
        <div className="flex justify-end gap-5 mt-12">
          <Button
            onClick={() => {
              deletePost(id)
            }}
            className="bg-red-500   hover:bg-red-800"
          >
            <RiDeleteBinFill /> Delete
          </Button>
          <Button
            onClick={() => {
              updatePost([id, formValue])
            }}
            className="bg-primary  hover:bg-blue-800 "
          >
            <MdModeEdit /> Update
          </Button>
        </div>
      </form>
      <div className="lg:w-[40%]  ml-auto ">
        <CommentsBox
          postComments={postComments}
          isloadingComments={isloadingComments}
        />
      </div>
    </div>
  )
}
export default Post
