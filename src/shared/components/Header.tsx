import * as React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { RiNotification2Fill } from "react-icons/ri"
import {
  AiFillPlusSquare,
  AiTwotoneAppstore,
  AiTwotonePlusCircle,
} from "react-icons/ai"
import { SectionWrapper } from "."
import { useAppSelector } from "../../redux/app/hooks"
import { BiSolidPlusCircle } from "react-icons/bi"

function Header() {
  const postsLength = useAppSelector((state) => state.postState.posts?.length)
  return (
    <header className="mb-[65px] w-full z-[99]   ">
      <div className="fixed top-0 bg-slate-100 left-0  h-[65px]  w-screen justify-center flex items-center">
        <SectionWrapper className="flex mt-[60px] items-center justify-between h-full bg-white">
          <Link to="/">
            <h1 className="font-extrabold text-lg flex gap-[0.5rem] items-center">
              <span className="h-7 w-7 font-bold bg-primary flex justify-center items-center  rounded-full "></span>
              Arbit Blog
            </h1>
          </Link>
          <div className="flex  items-center gap-4">
            {/* <span className="h-4  flex items-center justify-center w-4 p-1 -mr-[10px] -mb-[5px]  text-[10px]  bg-green-100 text-green-900 rounded-full">
              {postsLength}
            </span> */}
            <Link title="add new post" to="/post/create">
              <BiSolidPlusCircle className="text-primary hover:text-blue-900 w-7 h-7 mr-[-5px]">
                +
              </BiSolidPlusCircle>
            </Link>
            <Link className="relative font-bold " to="/">
              Posts
              <span className="h-4 font-normal flex items-center justify-center w-4 p-1 absolute top-[-10px] right-[-5px] text-[10px]  bg-green-100 text-green-900 rounded-full">
                {postsLength}
              </span>
            </Link>
            <RiNotification2Fill className="text-gray-400" />
            <AiTwotoneAppstore className="text-gray-400" />
            <div className="h-6 w-6 font-bold text-primary flex justify-center items-center border-[0.5px] border-primary bg-gray-100 rounded-full ">
              A
            </div>
          </div>
        </SectionWrapper>
      </div>
    </header>
  )
}
export default Header
