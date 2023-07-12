import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  ImageList,
  ImageListItem,
  Paper,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import Post from "./Post";
import EmptySpace from "../common/EmptySpace";
export default function Posts({ isloading, posts, sharedPosts, groupPosts }) {
  const [width, setWidth] = useState(window.innerWidth);
  const user = useSelector((state) => state.userAuth.authData);
  const currentGroup = useSelector((state) => state.currentGroup.details);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    return () => {
      window.removeEventListener("resize", window);
    };
  }, [width]);
  const setCols = () => {
    if (width > 700 && width < 1000) {
      return 2;
    } else if (width < 700) {
      return 1;
    } else {
      if (sharedPosts) {
        return 3;
      }
      return 4;
    }
  };
  return isloading ? (
    user ? (
      <CircularProgress sx={{ m: "100px" }} />
    ) : (
      <Paper
        elevation={3}
        sx={{
          m: { md: "100px", xs: "10px" },
          mt: { xs: "200px" },
          width: "275px",
          p: { md: "20px", xs: "10px" },
        }}
      >
        <Typography variant="h5">You must log in to create memories</Typography>
      </Paper>
    )
  ) : posts.length === 0 ? (
    <EmptySpace />
  ) : (
    <Box sx={styles}>
      <ImageList variant="masonry" cols={setCols()} gap={5}>
        {posts?.map((item) => (
          <ImageListItem key={item._id}>
            <Post
              post={item}
              loading={isloading}
              hasAccess={
                currentGroup
                  ? currentGroup.access.includes(user?.data._id)
                  : true
              }
              sharedPost={sharedPosts}
              groupPost={groupPosts}
              userId={user?.data._id}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
const styles = {
  width: "100%",
  height: "auto",
  position: "relative",
  paddingX: "20px",
};
