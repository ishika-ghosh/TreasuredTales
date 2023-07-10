import React from "react";
import { Button, Box, Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Input from "../common/Input";
import { useDispatch } from "react-redux";

const PostForm = ({
  postData,
  handleChange,
  handleClear,
  handleSubmit,
  handleFile,
  currentId,
  fileLoading,
  currentGroupId,
  selectedSharedPost,
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
        {!currentId && (
          <Grid item xs={12}>
            <input type="file" accept="image/*" onChange={handleFile} />
          </Grid>
        )}
      </Grid>

      {
        <LoadingButton
          fullWidth
          variant="contained"
          loading={fileLoading}
          sx={{ mt: 3, mb: 1 }}
          onClick={() =>
            handleSubmit(
              postData,
              dispatch,
              currentId,
              handleClear,
              currentGroupId,
              selectedSharedPost
            )
          }
          disabled={fileLoading}
        >
          Submit
        </LoadingButton>
      }
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
