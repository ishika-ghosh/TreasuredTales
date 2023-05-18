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
export default function Posts({ isloading, posts }) {
  const [width, setWidth] = useState(window.innerWidth);
  const user = useSelector((state) => state.userAuth.authData);
  const currentGroup = useSelector((state) => state.currentGroup.details);
  const handleAccess = () => {
    if (currentGroup) {
      if (
        currentGroup.access.includes(user.data._id) ||
        currentGroup.creator._id === user.data._id
      ) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

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
  ) : (
    <Box sx={styles}>
      <ImageList variant="masonry" cols={setCols()} gap={5}>
        {posts.map((item) => (
          <ImageListItem key={item._id}>
            <Post post={item} loading={isloading} hasAccess={handleAccess()} />
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
