import React from "react";
import { Button, Box, Grid } from "@mui/material";
import Input from "../common/Input";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";

const PostForm = ({
  postData,
  handleChange,
  handleClear,
  handleSubmit,
  setPostData,
  currentId,
}) => {
  const dispatch = useDispatch();
  return (
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
        onClick={() => handleSubmit(postData, dispatch, currentId, handleClear)}
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
  );
};

export default PostForm;
