import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Layout } from "./shared/components"
import Dashboard from "./pages/dashbooard"
import Post from "./pages/post"
import Posts from "./pages/posts"
import "./index.css"
import CreatePost from "./pages/post/createPost"

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Posts />}></Route>
          <Route path="post/:id" element={<Post />}></Route>
          <Route path="post/create" element={<CreatePost />}></Route>
          <Route
            path="*"
            element={
              <div className="flex w-full justify-center  items-center">
                404 | Page not found!
              </div>
            }
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
