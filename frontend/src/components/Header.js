import React, { useEffect, useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
// import { useStyles } from "./utils";
export const Header = ({value, setValue, refreshPage, setRefreshPage}) => {
  // const classes = useStyles();
  const dispath = useDispatch();
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("userId"))
      setLoggedIn(true)
    else
      setLoggedIn(false)  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshPage]);
  const logout = () => {
    localStorage.setItem("userId", "");    
    setRefreshPage(!refreshPage);
    dispath(authActions.logout());
  }
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
        "linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)",
      }}
    >
      <Toolbar>
        <Typography 
        // className={classes.font}
        variant="h4">
          BlogsApp
        </Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"} marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                // className={classes.font}
                LinkComponent={Link}
                to="/blogs"
                label="All Blogs"
              />
              <Tab
                // className={classes.font}
                LinkComponent={Link}
                to="/myBlogs"
                label="My Feed"
              />
              <Tab
                // className={classes.font}
                LinkComponent={Link}
                to="/blogs/add"
                label="Add Blog"
              />
              <Tab
                // className={classes.font}
                LinkComponent={Link}
                to="/user"
                label="Profile"
              />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              {" "}
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Login
              </Button>
              {/* <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Signup
              </Button> */}
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={logout}
              LinkComponent={Link}
              to="/auth"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

