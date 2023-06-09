import { useState, useEffect } from "react";
import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Avatar, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SET_SELECTED_POST } from "../../actions/action";
import { handleSubmit } from "./submit";
import PostForm from "../Forms/PostForm";
import axios from "axios";

const AddAndUpdate = React.forwardRef(({ loading }, ref) => {
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.selectedId);
  const currentGroupId = useSelector((state) => state.selectedGroup);
  const post = useSelector((state) =>
    currentGroupId
      ? currentId
        ? state.currentGroup.posts.find((post) => post._id === currentId)
        : null
      : currentId
      ? state.posts.posts.find((post) => post._id === currentId)
      : null
  );
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const [fileLoading, setFileLoading] = useState(false);

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
  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileLoading(true);
      axios
        .post("https://api.cloudinary.com/v1_1/dvopc7xr8/image/upload", {
          file: reader.result,
          upload_preset: "trasuredTales",
        })
        .then((res) => {
          setPostData({ ...postData, selectedFile: res.data.url });
          setFileLoading(false);
        })
        .catch((err) => console.log(err));
    };
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
          handleFile={handleFile}
          currentId={currentId}
          fileLoading={fileLoading}
          currentGroupId={currentGroupId}
        />
      )}
    </>
  );
});

export default AddAndUpdate;
