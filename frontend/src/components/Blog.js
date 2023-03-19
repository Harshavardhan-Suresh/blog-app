import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import AccountCircle from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useStyles } from "./utils";
const Blog = ({ title, description, image, userName, isUser, id}) => {
  // const classes = useStyles();
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    // const data = await res.data;
    // return data;
  };
  const handleDelete = () => {
    deleteRequest()
    .then(() => window.location.reload())
    // .then(() => navigate("/user/"));
  };
  const handleUserProfile = async() => {
    const blog_id = id;
    console.log(blog_id);
    const res = await axios
    .get(`http://localhost:5000/api/blog/${blog_id}`)
    const id1 = res.data.blog.user;
    console.log(id1);
    navigate(`/user/${id1}`)
    // console.log(res);
  };
  return (
    <div>
      {" "}
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <CardHeader
              avatar={
                <Avatar
                  // className={classes.font}
                  sx={{ bgcolor: "red" }}
                  aria-label="recipe"
                >
                  {userName ? userName.charAt(0) : ""}
                </Avatar>
              }
              title={title}
            />
            
            
            <IconButton title="Edit" onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton title="Delete" onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
            
          </Box>
        )}
        {!isUser && (
          <Box display="flex">
            <CardHeader
              avatar={
                <Avatar
                  // className={classes.font}
                  sx={{ bgcolor: "red" }}
                  aria-label="recipe"
                >
                  {userName ? userName.charAt(0) : ""}
                </Avatar>
              }
              title={title}
            />
            <IconButton title="UserProfile" onClick={handleUserProfile} sx={{ marginLeft: "auto" }}>
              <AccountCircle color="warning" />
            </IconButton>
          </Box>
        )}
        <CardMedia
          component="img"
          height="400"
          image={image}
          alt="Paella dish"
        />

        <CardContent>
          <hr />
          <br />
          <Typography
            // className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            <b>{userName}</b> {": "} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
