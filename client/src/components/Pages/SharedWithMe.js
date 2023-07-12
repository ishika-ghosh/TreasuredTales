import React from "react";
import { useEffect, useState } from "react";
import { Grid, CssBaseline, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Options from "./../Share/Options";
import SharedPosts from "../Share/SharedPosts";
import CommonModal from "../common/CommonModal";
import AddAndUpdate from "../AddImage/AddAndUpdate";
import { fetchAllMemory } from "../../actions/sharePosts";
import {
  CLOSE_POST_MODAL,
  CLEAR_SELECTED_POST,
  CLEAR_SELECTED_SHARED_POST,
} from "../../actions/action";

function SharedWithMe() {
  const [currentPosts, setCurrentPosts] = useState("ALL");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth.authData);
  const modalState = useSelector((state) => state.modal.postModal);
  const loading = useSelector((state) => state.posts.loading);
  const handleClose = () => {
    dispatch({ type: CLOSE_POST_MODAL });
    dispatch({ type: CLEAR_SELECTED_POST });
    dispatch({ type: CLEAR_SELECTED_SHARED_POST });
  };
  useEffect(() => {
    if (user) {
      dispatch(fetchAllMemory());
    }
  }, [user, dispatch]);

  return (
    <>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={2}
          style={{ paddingLeft: "30px", maxHeight: "100vh" }}
        >
          <Options setCurrentPosts={setCurrentPosts} />
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid
          item
          xs={12}
          md={9.8}
          sx={{ marginTop: { md: "80px", xs: "0px" } }}
        >
          <SharedPosts currentPosts={currentPosts} />
        </Grid>
      </Grid>
      <CommonModal open={modalState} handleClose={handleClose}>
        <AddAndUpdate open={modalState} loading={loading} />
      </CommonModal>
    </>
  );
}

export default SharedWithMe;
