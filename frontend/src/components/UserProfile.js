import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";

const UserProfile = ({setValue, refreshPage, setRefreshPage}) => {
    const [user, setUser] = useState();
    const [userDetails, setUserDetails] = useState();
    const [follow, setFollow] = useState("Follow");
    const id = useParams().id;
    const navigate = useNavigate();
    const sendRequest = async () => {
      const res = await axios
        .get(`http://localhost:5000/api/blog/user/${id}`)
        .catch((err) => console.log(err));
      console.log(res);
      const data =res.data;
      return data;
    };
    const findUserRequest = async () => {
        const res = await axios
        .get(`http://localhost:5000/api/user/${id}`)
        .catch((err) => console.log(err));
        console.log(res);
        const data = res.data;
        return data;
    };
    const checkFollowing = async () => {
        const res = await axios
        .get(`http://localhost:5000/api/user/${id}`);
        const id1 = localStorage.getItem("userId");
        const f = res.data.user.followers;
        // console.log(f)  
        // console.log(id1);
        for (let x in f) {
            // console.log(f[x])
            if (f[x]._id === id1) {
                setFollow("Unfollow");
                // console.log(follow);
            }
        }
    }
    const handleFollowing = async() => {
        if (follow === "Follow") {    
            const id1 = localStorage.getItem("userId");
            // console.log(id1);
            // console.log(id);
            await axios
            .post(`http://localhost:5000/api/user/follow/${id1}/${id}`);
        }
        else {
            const id1 = localStorage.getItem("userId");
            // console.log(id1);
            // console.log(id);
            await axios
            .post(`http://localhost:5000/api/user/unfollow/${id1}/${id}`);    
        }
        window.location.reload();
        // navigate("/user/");
    }
    useEffect(() => {
      setValue(3);
      sendRequest().then((data) => setUser(data.blogs));
      findUserRequest().then((data) => setUserDetails(data.user))
      checkFollowing();
    //   console.log(follow);
    //   console.log(user);
    //   console.log(userDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshPage]);
    return (
      <div>
        {userDetails && <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
            <h1 style={{color:"lightgreen", fontSize:80}}>{userDetails.name}</h1>
            {id !== localStorage.getItem("userId") && <Button
                onClick={handleFollowing}
                variant="contained"
                sx={{ margin: 1, borderRadius: 2, height: "2em"}}
                color="warning"
                style={{marginTop: "2%"}}
            >
                {follow}
            </Button>}
        </div>}
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
          user.blogs && userDetails &&    
          user.blogs.map((blog, index) => (
            <Blog
              id={blog._id}
              key={index}
              isUser={userDetails._id === localStorage.getItem("userId")}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              userName={user.name}
            />
          ))}
      </div>
    );
}

export default UserProfile