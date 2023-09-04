import { Outlet } from "react-router-dom"
import Header from "./Header"
import { SectionWrapper } from "."

const Layout = () => {
  return (
    <div className="bg-slate-100 w-screen min-h-screen py-[20px] lg:py-[30px] relative flex flex-col items-center">
      <Header />
      <SectionWrapper className="mt-[30px] bg-white h-auto lg:min-h-[618px] ">
        <Outlet />
      </SectionWrapper>
    </div>
  )
}

export default Layout
