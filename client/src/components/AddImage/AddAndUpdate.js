import { useState, useEffect } from "react";
import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Avatar,
  Box,
  Typography,
  Container,
  Fade,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleSubmit } from "./submit";
import { setOptionId } from "../../actions/options";
import AddAndUpdateForm from "../Forms/AddAndUpdateForm";

const AddAndUpdate = React.forwardRef(({ open }, ref) => {
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.selectedId);
  const loading = useSelector((state) => state.posts.loading);
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((post) => post._id === currentId) : null
  );
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleClear = () => {
    dispatch(setOptionId(null));
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  const handleChange = (e) => {
    if (e.target.name === "tags") {
      setPostData({ ...postData, tags: e.target.value.split(" ") });
    } else {
      setPostData({ ...postData, [e.target.name]: e.target.value });
    }
  };
  return (
    <Fade in={open}>
      <Container component="main" maxWidth="xs">
        <Box sx={styles}>
          <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
            <AddPhotoAlternateIcon />
          </Avatar>

          <Typography component="h1" variant="h5" id="transition-modal-title">
            {currentId ? "Editing" : "Creating"} Memory
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <AddAndUpdateForm
              postData={postData}
              handleChange={handleChange}
              handleClear={handleClear}
              handleSubmit={handleSubmit}
              setPostData={setPostData}
              currentId={currentId}
            />
          )}
        </Box>
      </Container>
    </Fade>
  );
});

export default AddAndUpdate;
export const styles = {
  marginTop: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  bgcolor: "#f0f6fc",
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};
