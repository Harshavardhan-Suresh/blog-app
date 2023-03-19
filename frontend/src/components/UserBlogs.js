import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
export const UserBlogs = ({setValue, refreshPage, setRefreshPage}) => {
  const [user, setUser] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/`)
      .catch((err) => console.log(err));
    console.log(res.data.blogs);
    let blogs = res.data.blogs;
    let myfeed = []
    for (let x in blogs) {
      console.log(blogs[x].user._id)
      if (blogs[x].user._id === localStorage.getItem("userId"))
        myfeed.push(blogs[x])
      else {
        const id1 = localStorage.getItem("userId");
        const res1 = await axios
        .get(`http://localhost:5000/api/user/${id1}/`);
        // console.log(res1.data.user.following)
        let f = res1.data.user.following; 
        for (let x1 in f) {
          // if (f[x])
          if(f[x1]._id === blogs[x].user._id) {
            myfeed.push(blogs[x])
          }
        }
      }
    }
    console.log(myfeed)
    return myfeed;
  };
  useEffect(() => {
    setValue(1);
    sendRequest().then((data) => setUser(data));
    // console.log(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshPage]);
  return (
    <div>
      
      {user &&
        user &&
        user.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={blog.user._id === localStorage.getItem("userId")}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            userName={blog.user.name}
          />
        ))}
    </div>
  );
};

