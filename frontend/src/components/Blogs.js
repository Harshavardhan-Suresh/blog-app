import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
const Blogs = ({setValue, refreshPage, setRefreshPage}) => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog")
      .catch((err) => console.log(err));
    console.log(res.data);
    const data = res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    setValue(0);
    sendRequest().then((data) => setBlogs(data.blogs));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshPage]);
  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <Blog refreshPage={refreshPage} setRefreshPage={setRefreshPage}
            id={blog._id}
            key={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            userName={blog.user.name}
          />
        ))}
    </div>
  );
};

export default Blogs;
