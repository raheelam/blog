import { Link, useNavigate } from "react-router-dom"
import { useCreatePostMutation } from "../../redux/api/postApi"
import { useForm } from "../../shared/hooks"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { BiArrowBack } from "react-icons/bi"
import { Button } from "./components/Button"
import { DoubleClickToEditTextArea } from "./components/DoubleClickToEditTextArea"

const initialValue = {
  body: "",
  title: "",
}

const CreatePost = () => {
  const navigate = useNavigate()

  const [
    createPost,
    { isError: isCreatePostError, isSuccess: isCreatePostSuccess },
  ] = useCreatePostMutation()

  const { formValue, handleInputChange } = useForm(initialValue)

  useEffect(() => {
    if (isCreatePostSuccess) {
      toast.success("Post successfully created", {
        position: "top-right",
      })

      navigate(`/`)
    }
  }, [isCreatePostSuccess, navigate])

  useEffect(() => {
    if (isCreatePostError) {
      toast.error("An error occured", {
        position: "top-right",
      })
    }
  }, [isCreatePostError])

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
        </div>

        <div className="flex gap-[5px]  flex-col">
          <label className="font-bold" htmlFor="title">
            Title
          </label>
          <DoubleClickToEditTextArea
            id="title"
            name="title"
            onChange={(e) => handleInputChange(e, "title")}
            className="font-bold"
            readOnly={false}
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
            readOnly={false}
            onChange={(e) => handleInputChange(e, "body")}
            value={formValue.body}
          ></DoubleClickToEditTextArea>
        </div>
        <Button
          onClick={() => {
            createPost(formValue)
          }}
          className="bg-primary hover:bg-blue-800 ml-auto mt-10"
        >
          Create
        </Button>
      </form>
    </div>
  )
}
export default CreatePost
