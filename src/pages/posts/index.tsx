import { useEffect, useState } from "react"
import { useGetAllPostsQuery } from "../../redux/api/postApi"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../redux/app/hooks"
import { toast } from "react-toastify"

//NOTE
//COMPONENTS TO BE EXTRACTED
// 1. PAGINATION COMPONENT
// 2. POST CARD COMPONENT
// 3. POST LIST COMPONENT

const Posts = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { error, isLoading } = useGetAllPostsQuery({ userId: 1 })
  const posts = useAppSelector((state) => state.postState.posts)
  const total = posts?.length
  const pages = Math.ceil((total ?? 1) / 6)

  useEffect(() => {
    if (error) {
      toast.error("something happened", {
        position: "top-right",
      })
    }
  }, [error])

  return (
    <div className="flex relative flex-col w-full justify-between lg:h-[600px] py-5">
      <div className="grid  w-full md:grid-cols-3 gap-x-[2rem] gap-y-[3rem]  lg:gap-x-[6rem] lg:gap-y-[5rem] ">
        {posts
          ?.slice((currentPage - 1) * 6, (currentPage - 1) * 6 + 6)
          .map((post) => {
            return (
              <div
                className="flex flex-col gap-[1rem] "
                key={post.id + post.title}
              >
                <Link className="hover:underline" to={`/post/${post.id}`}>
                  <h2 className="font-bold capitalize line-clamp-2 h-[48px]">
                    {post.title}
                  </h2>
                </Link>
                <p className="line-clamp-4">{post.body}</p>
              </div>
            )
          })}
      </div>
      <div className="flex flex-wrap  mt-10 lg:mt-0 gap-2  mx-auto">
        {[...Array(pages)].map((_, i) => {
          const pageNumber = i + 1
          return (
            <span
              onClick={() => {
                setCurrentPage(pageNumber)
              }}
              className={`p-2 cursor-pointer rounded-sm text-black border border-grey-100 ${
                currentPage === pageNumber ? "bg-slate-100" : "bg-white"
              }`}
              key={pageNumber}
            >
              {pageNumber}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default Posts
