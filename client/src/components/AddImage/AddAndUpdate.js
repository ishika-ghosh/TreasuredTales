import { useState, useEffect } from "react";
import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Avatar, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleSubmit } from "./submit";
import { SET_SELECTED_POST } from "../../actions/action";
import PostForm from "../Forms/PostForm";

const AddAndUpdate = React.forwardRef((open, ref) => {
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
    dispatch({ type: SET_SELECTED_POST, payload: null });
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
    <>
      <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
        <AddPhotoAlternateIcon />
      </Avatar>

      <Typography component="h1" variant="h5" id="transition-modal-title">
        {currentId ? "Editing" : "Creating"} Memory
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <PostForm
          postData={postData}
          handleChange={handleChange}
          handleClear={handleClear}
          handleSubmit={handleSubmit}
          setPostData={setPostData}
          currentId={currentId}
        />
      )}
    </>
  );
});

export default AddAndUpdate;
