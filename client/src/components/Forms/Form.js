import { useState, useEffect } from "react";
import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Avatar,
  Button,
  Box,
  Typography,
  Container,
  Fade,
  Grid,
  CircularProgress,
} from "@mui/material";
import Input from "../common/Input";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./style";
import { handleSubmit } from "./submit";
import { setOptionId } from "../../actions/options";

const Form = React.forwardRef(({ open }, ref) => {
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
            <Box sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Input
                    label="Title"
                    name="title"
                    value={postData.title}
                    handleChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    name="message"
                    label="Message"
                    value={postData.message}
                    handleChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    name="tags"
                    label="Tags"
                    value={postData.tags}
                    handleChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FileBase
                    type="file"
                    multiple={false}
                    id="file-button"
                    onDone={(file) =>
                      setPostData({ ...postData, selectedFile: file.base64 })
                    }
                  />
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
                onClick={() =>
                  handleSubmit(postData, dispatch, currentId, handleClear)
                }
              >
                Submit
              </Button>
              <Button
                type="clear"
                fullWidth
                variant="outlined"
                sx={{ mt: 1, mb: 1 }}
                onClick={handleClear}
              >
                clear
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Fade>
  );
});

export default Form;
