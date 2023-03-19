import { Header } from "./components/Header";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { UserBlogs } from "./components/UserBlogs";
import Auth from "./components/Auth";
import { AddBlog } from "./components/AddBlog";
import { BlogDetail } from "./components/BlogDetail";
import Blogs from "./components/Blogs";
import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";
import Followers from "./components/Followers";
import Following from "./components/Following";
import LandingPage from "./components/LandingPage";
function App() {
  const [value, setValue] = useState();
  const [refreshPage, setRefreshPage] = useState(0);
  return <React.Fragment>
    <header>
      <Header value = {value} setValue={setValue} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/>
    </header>
    <main >
      <Routes >
        <Route path="/auth" element={<Auth setValue={setValue} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/>} />
        <Route path="/" element={<LandingPage setValue={setValue} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/>} />
        <Route path="/blogs" element={<Blogs setValue={setValue} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/>} />
        <Route path="/myBlogs" element={<UserBlogs setValue={setValue} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/>} />
        <Route path="/myBlogs/:id" element={<BlogDetail />} />
        <Route path="/user/" element={<Profile setValue={setValue} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/>} />
        <Route path="/user/:id" element={<UserProfile setValue={setValue} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/>} />
        <Route path="/following/:id" element={<Following setValue={setValue}/>} />
        <Route path="/followers/:id" element={<Followers setValue={setValue}/>} />
        <Route path="/blogs/add" element={<AddBlog setValue={setValue}/>} />
      </Routes>
    </main>
  </React.Fragment>
}

export default App;