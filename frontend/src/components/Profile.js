import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = ({setValue, refreshPage, setRefreshPage}) => {
    const [user, setUser] = useState();
    const [userDetails, setUserDetails] = useState();
    const id = localStorage.getItem("userId");
    const navigate = useNavigate();
    const sendRequest = async () => {
      const res = await axios
        .get(`http://localhost:5000/api/blog/user/${id}`)
        .catch((err) => console.log(err));
    //   console.log(res);
      const data =res.data;
      return data;
    };
    const findUserRequest = async () => {
        const res = await axios
        .get(`http://localhost:5000/api/user/${id}`)
        .catch((err) => console.log(err));
        // console.log(res);
        const data = res.data;
        return data;
    };
    useEffect(() => {
      setValue(3);
      sendRequest().then((data) => setUser(data.blogs));
      findUserRequest().then((data) => setUserDetails(data.user))
      // console.log(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps      
    }, [refreshPage]);
    return (
      <div>
        {userDetails && <h1 style={{color:"lightgreen", fontSize:80, textAlign:"center"}}>{userDetails.name}</h1>}
        {userDetails && <div style={{color:"lightblue", fontSize:30, textAlign:"center", display:"flex", flexDirection:"row",justifyContent: "space-around"}}><div><h1>Blogs</h1><h1>{userDetails.blogs.length}</h1></div>
        <div><h1>Followers</h1><h1>
            <Button
                onClick={() => navigate(`/followers/${id}`)}
                // variant= "contained"
                sx={{ margin: 1, borderRadius: 2, height: "2em", fontSize:40}}
                // color="warning"
                style={{marginTop: "2%"}}
            >
                {userDetails.followers.length}
            </Button>
            </h1></div>
        <div><h1>Following</h1><h1>
            <Button
                onClick={() => navigate(`/following/${id}`)}
                // variant= "contained"
                sx={{ margin: 1, borderRadius: 2, height: "2em", fontSize:40}}
                // color="warning"
                style={{marginTop: "2%"}}
            >
                {userDetails.following.length}
            </Button>
            </h1></div>
        </div> }  
        {user &&
          user.blogs &&     
          user.blogs.map((blog, index) => (
            <Blog
              id={blog._id}
              key={index}
              isUser={true}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              userName={user.name}
            />
          ))}
      </div>
    );
}

export default Profile